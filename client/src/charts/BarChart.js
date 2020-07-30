import * as d3 from 'd3';
import * as logData from './data/log.json';
import * as WBSJSONData from './data/wbs.json';

const MARGIN = { TOP: 10, BOTTOM: 60, LEFT: 70, RIGHT: 10 };
const WIDTH = 760 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 600 - MARGIN.TOP - MARGIN.BOTTOM;
let mode = 'dark';

const getTotalLevel1 = (data, code) => {
  return data.default
    .filter(({ level1_code }) => level1_code === code)
    .reduce((total, { hours }) => total + hours, 0);
};

const getTotalLevel2 = (data, code1, code2) => {
  return data.default
    .filter(
      (element) =>
        element.level1_code === code1 && element.level2_code === code2
    )
    .reduce((total, { hours }) => total + hours, 0);
};

const getTotalLevel3 = (data, code1, code2, code3) => {
  return data.default
    .filter(
      (element) =>
        element.level1_code === code1 &&
        element.level2_code === code2 &&
        element.level3_code === code3
    )
    .reduce((total, { hours }) => total + hours, 0);
};

const getWBSLevel1 = (data) => {
  const wbsOutput = [];
  data.default.forEach((element) => {
    wbsOutput.push({ title: element.title, code: element.code });
  });
  return wbsOutput;
};

const getWBSLevel2 = (data, level1) => {
  const wbslevel1 = [];
  const wbsOutput = [];

  data.default.forEach((element) => {
    if (element.code === level1) {
      wbslevel1.push({
        wbsTitle1: element.title,
        wbsCode1: element.code,
        sub: element.sub
      });
    }
  });

  if (wbslevel1[0]) {
    wbslevel1[0].sub.forEach((element) => {
      wbsOutput.push({
        wbsTitle1: wbslevel1[0].wbsTitle1,
        wbsCode1: wbslevel1[0].wbsCode1,
        title: element.title,
        code: element.code
      });
    });
  }

  return wbsOutput;
};

const getWBSLevel3 = (data, level1, level2) => {
  const wbslevel1 = [];
  const wbslevel2 = [];
  const wbsOutput = [];

  data.default.forEach((element) => {
    if (element.code === level1) {
      wbslevel1.push({
        wbsTitle1: element.title,
        wbsCode1: element.code,
        sub: element.sub
      });
    }
  });

  if (wbslevel1[0]) {
    wbslevel1[0].sub.forEach((element) => {
      if (element.code === level2) {
        wbslevel2.push({
          wbsTitle1: wbslevel1[0].wbsTitle1,
          wbsCode1: wbslevel1[0].wbsCode1,
          title: element.title,
          code: element.code,
          sub: element.sub
        });
      }
    });
  }

  if (wbslevel2[0]) {
    wbslevel2[0].sub.forEach((element) => {
      wbsOutput.push({
        wbsTitle1: wbslevel2[0].wbsTitle1,
        wbsCode1: wbslevel2[0].wbsCode1,
        wbsTitle2: wbslevel2[0].title,
        wbsCode2: wbslevel2[0].code,
        title: element.title,
        code: element.code
      });
    });
  }

  return wbsOutput;
};

export default class D3Chart {
  constructor(element) {
    const vis = this;

    vis.svg = d3
      .select(element)
      .append('svg')
      .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .style('background', mode === 'dark' ? '#1b1e23' : 'none')
      .style('color', mode === 'dark' ? '#8e8e8e' : '#1b1e23')
      .append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    vis.xLabel = vis.svg
      .append('text')
      .attr('x', WIDTH / 2)
      .attr('y', HEIGHT + 50)
      .attr('text-anchor', 'middle')
      .style('fill', mode === 'dark' ? '#8e8e8e' : '#1b1e23');

    vis.svg
      .append('text')
      .attr('x', -(HEIGHT / 2))
      .attr('y', -50)
      .attr('text-anchor', 'middle')
      .text('Labour Hours')
      .attr('transform', 'rotate(-90)')
      .style('fill', mode === 'dark' ? '#8e8e8e' : '#1b1e23');

    vis.xAxisGroup = vis.svg
      .append('g')
      .attr('transform', `translate(0, ${HEIGHT})`);

    vis.yAxisGroup = vis.svg.append('g');

    vis.color = d3.scaleOrdinal(d3.schemeDark2);

    vis.update('All');
  }

  update(wbs1, wbs2) {
    const vis = this;

    vis.dataLevel1 = [];
    getWBSLevel1(WBSJSONData).forEach((codeTitle) => {
      vis.dataLevel1.push({
        code: codeTitle.code,
        title: codeTitle.title.toUpperCase(),
        codeTitle: `${codeTitle.code} - ${codeTitle.title.toUpperCase()}`,
        total: getTotalLevel1(logData, codeTitle.code)
      });
    });

    vis.dataLevel2 = [];
    getWBSLevel2(WBSJSONData, wbs1).forEach((codeTitle) => {
      vis.dataLevel2.push({
        wbsCode1: wbs1,
        wbsTitle1: codeTitle.wbsTitle1,
        code: codeTitle.code,
        title: codeTitle.title.toUpperCase(),
        codeTitle: `${codeTitle.code} - ${codeTitle.title.toUpperCase()}`,
        total: getTotalLevel2(logData, wbs1, codeTitle.code)
      });
    });

    vis.dataLevel3 = [];
    getWBSLevel3(WBSJSONData, wbs1, wbs2).forEach((codeTitle) => {
      vis.dataLevel3.push({
        wbsCode1: wbs1,
        wbsTitle1: codeTitle.wbsTitle1,
        wbsCode2: wbs2,
        wbsTitle2: codeTitle.wbsTitle2,
        code: codeTitle.code,
        title: codeTitle.title.toUpperCase(),
        codeTitle: `${codeTitle.code} - ${codeTitle.title.toUpperCase()}`,
        total: getTotalLevel3(logData, wbs1, wbs2, codeTitle.code)
      });
    });

    if (wbs1 === 'All') {
      vis.data = vis.dataLevel1;
      vis.xLabel.text(`Total Hours For Level 1`);
    } else if (wbs2) {
      vis.data = vis.dataLevel3;
      vis.xLabel.text(
        `Total Hours For Level 3 (${wbs1}-${wbs2})  (${vis.data[0].wbsTitle1.toUpperCase()}-${vis.data[0].wbsTitle2.toUpperCase()})`
      );
    } else if (wbs1) {
      vis.data = vis.dataLevel2;
      vis.xLabel.text(
        `Total Hours For Level 2 (${wbs1})  (${vis.data[0].wbsTitle1.toUpperCase()})`
      );
    }

    // console.log(vis.data)

    const y = d3
      .scaleLinear()
      .domain([
        d3.min(vis.data, (d) => d.total) * 0.9,
        d3.max(vis.data, (d) => d.total)
      ])
      .range([HEIGHT, 0]);

    const x = d3
      .scaleBand()
      .domain(vis.data.map((d) => d.codeTitle))
      .range([0, WIDTH])
      .padding(0.4);

    const xAxisCall = d3.axisBottom(x);
    vis.xAxisGroup.transition().duration(500).call(xAxisCall);

    const yAxisCall = d3.axisLeft(y);
    vis.yAxisGroup.transition().duration(500).call(yAxisCall);

    // DATA JOIN
    const rects = vis.svg.selectAll('rect').data(vis.data);

    // EXIT
    rects
      .exit()
      .transition()
      .duration(500)
      .attr('height', 0)
      .attr('y', HEIGHT)
      .remove();

    // UPDATE
    rects
      .transition()
      .duration(500)
      .attr('x', (d) => x(d.codeTitle))
      .attr('y', (d) => y(d.total))
      .attr('width', x.bandwidth)
      .attr('height', (d) => HEIGHT - y(d.total));

    // ENTER
    rects
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.codeTitle))
      .attr('width', x.bandwidth)
      .attr('fill', (d) => vis.color(d.total))
      .attr('y', HEIGHT)
      .transition()
      .duration(500)
      .attr('height', (d) => HEIGHT - y(d.total))
      .attr('y', (d) => y(d.total));
  }
}

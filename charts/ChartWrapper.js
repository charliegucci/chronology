
import React, { useRef, useState, useEffect } from 'react';
import BarChart from './BarChart';

const BarChartWrapper = ({ wbs1, wbs2}) => {
	const chartArea = useRef(null)
	const [chart, setChart] = useState(null)

	useEffect(() => {
		if (!chart) {
			setChart(new BarChart(chartArea.current))
		}
		else if (chart) {
			chart.update(wbs1, wbs2)
		}
	}, [chart, wbs1, wbs2])

	return (
		<div className="chart-area" ref={chartArea}></div>
	)
}

export default BarChartWrapper
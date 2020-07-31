import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridContainer from '../assets/component/GridContainer';
import GridItem from '../assets/component/GridItem';
import errorPageStyle from '../assets/component/errorPageStyles';
import image from '../img/404.jpg';
import Logo from '../core/Logo';
import Footer from '../core/Footer';

const ErrorPage = () => {
  const useStyles = makeStyles(errorPageStyle);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);
  const classes = useStyles();
  return (
    <div
      className={classes.pageHeader}
      style={{
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      <div className={classes.contentCenter}>
        <Logo />
        <GridContainer>
          <GridItem md={12}>
            <h1 className={classes.title}>404</h1>
            <h2 className={classes.subTitle}>Page not found :(</h2>
            <h4 className={classes.description}>
              Ooooups! Looks like you got lost.
            </h4>
          </GridItem>
        </GridContainer>
        <Footer />
      </div>
    </div>
  );
};
export default ErrorPage;

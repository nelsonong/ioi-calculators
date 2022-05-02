import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import Header from '../../components/Header';
import Home from '../../screens/Home';
import Cameras from '../../screens/Cameras';
import DVRs from '../../screens/DVRs';
import Footer from '../../components/Footer';
import styles from '../../index.css';

const AppRouter = () => (
  <BrowserRouter>
    <div className={styles.root}>
      <Header />
      <Switch>
        <Route path='/calculator' component={Home} exact={true} />
        <Route path='/calculator/cameras' component={Cameras} />
        <Route path='/calculator/DVRs' component={DVRs} />
        <Route path='/calculator/framerate' component={Cameras} />
        <Route path='/calculator/storage' component={DVRs} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);

export default AppRouter;

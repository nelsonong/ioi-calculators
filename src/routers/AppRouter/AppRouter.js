import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Home from '../../screens/Home';
import FrameRate from '../../screens/FrameRate';
import Storage from '../../screens/Storage';
import Footer from '../../components/Footer';
import styles from '../../index.css';

const AppRouter = () => (
    <BrowserRouter>
        <div className={styles.root}>
            <Header />
            <Switch>
                <Route path='/' component={Home} exact={true} />
                <Route path='/framerate' component={FrameRate} />
                <Route path='/storage' component={Storage} />
            </Switch>
            <Footer />
        </div>
    </BrowserRouter>
)

export default AppRouter;
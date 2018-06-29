import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../../components/Header';
import Home from '../../scenes/Home';
import FrameRate from '../../scenes/FrameRate';
import Storage from '../../scenes/Storage';
import Footer from '../../components/Footer';

const AppRouter = () => (
    <BrowserRouter>
        <div>
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
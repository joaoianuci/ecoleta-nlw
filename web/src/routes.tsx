import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import Dashboard from './pages/Dashboard';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Home} exact path="/"></Route>
            <Route component={CreatePoint} path="/create-point"></Route>
            <Route component={Dashboard} path="/dashboard"></Route>
        </BrowserRouter>
    )
} 

export default Routes;
import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Signup from '../pages/Signup';
import Signin from '../pages/Signin';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Teste from '../pages/Teste';

export default function Routes(){
    return(
    <Switch>
        <Route path="/" exact={true} component={Signin} />
        <Route path="/register" component={Signup} />

        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/profile" component={Profile} isPrivate />

        <Route path="/teste" component={Teste} />

        <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
    );
}

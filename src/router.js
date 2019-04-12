import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Upload from './routes/upload';
import Login from './routes/login';
import Home from './routes/home'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/upload" exact component={Upload} />
        <Route path="/home" component={Home} />
       

      </Switch>
    </Router>
  );
}

export default RouterConfig;


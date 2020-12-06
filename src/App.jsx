import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import './App.scss';

export const App = () => (
  <div className="App">
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="*">
        <h1>Page Not Found</h1>
      </Route>
    </Switch>
  </div>
);

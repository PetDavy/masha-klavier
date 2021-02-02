import React from 'react';
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import './App.scss';

export const App = () => (
  <div className="App">
    <Navigation />
    <Home />
  </div>
);

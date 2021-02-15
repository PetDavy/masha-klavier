import React, { useState } from 'react';
import { Home } from './components/Home';
import { About } from './components/About';
import { Navigation } from './components/Navigation';
import './App.scss';

export const App = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="App">
      <Navigation
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <Home isActive={activeItem === 0} />
      <About isActive={activeItem === 1} />
    </div>
  );
};

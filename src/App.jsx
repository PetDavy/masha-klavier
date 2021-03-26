import React, { useState } from 'react';
import { Home } from './components/Home';
import { About } from './components/About';
import { Navigation } from './components/Navigation';
import { Portfolio } from './components/Portfolio';
import './App.scss';

export const App = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const hideMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className="App">
      <Navigation
        isOpen={isOpenMenu}
        setIsOpen={setIsOpenMenu}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <Home
        isActive={activeItem === 0}
        hideMenu={hideMenu}
      />
      <About
        isActive={activeItem === 1}
        hideMenu={hideMenu}
      />
      <Portfolio
        isActive={activeItem === 2}
        hideMenu={hideMenu}
      />
    </div>
  );
};

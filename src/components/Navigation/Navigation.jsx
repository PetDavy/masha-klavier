import React, { useState } from 'react';
import { MenuItem } from './MenuItem';
import './Navigation.scss';

const MENU_BLOCKS = {
  Home: 'fa-home',
  About: 'fa-user',
  Portfolio: 'fa-briefcase',
  Contact: 'fa-comments',
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const triggerNavigation = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="Navigation">
      <button
        type="button"
        className="Navigation__trigger"
        onClick={triggerNavigation}
      >
        <div className="Navigation__trigger-line-1" />
        <div className="Navigation__trigger-line-2" />
      </button>
      <ul className="Navigation__menu menu">
        {Object.entries(MENU_BLOCKS).map((block, i) => (
          <MenuItem
            block={block}
            isOpen={isOpen}
            isActive={i === activeItem}
            delay={100 + i * 50}
            clickHandler={setActiveItem}
            key={block[0]}
          />
        ))}
      </ul>
      <div
        className="Navigation__back-ground"
        style={{
          height: isOpen ? `${Object.keys(MENU_BLOCKS).length * 65}px` : '60px',
        }}
      />
    </nav>
  );
};

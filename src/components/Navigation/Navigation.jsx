import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from './MenuItem';
import { Overlay } from './Overlay';
import './Navigation.scss';

const MENU_BLOCKS = {
  Home: 'fa-home',
  About: 'fa-user',
  Portfolio: 'fa-briefcase',
  Contact: 'fa-comments',
};

export const Navigation = ({ activeItem, setActiveItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerNavigation = () => {
    setIsOpen(!isOpen);
  };

  const hideMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
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
              setIsOpen={setIsOpen}
              id={i}
              key={block[0]}
            />
          ))}
        </ul>
        <div
          className="Navigation__back-ground"
          style={{
            height: isOpen
              ? `${Object.keys(MENU_BLOCKS).length * 65}px`
              : '60px',
          }}
        />
      </nav>
      <Overlay hideMenu={hideMenu} />
    </>
  );
};

Navigation.propTypes = {
  activeItem: PropTypes.number.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MenuItem } from './MenuItem';
import './Navigation.scss';

const MENU_BLOCKS = {
  Home: 'fa-home',
  About: 'fa-user',
  Portfolio: 'fa-briefcase',
  Contacts: 'fa-comments',
};

export const Navigation = (props) => {
  const {
    isOpen,
    setIsOpen,
    isLogedIn,
    path,
    activePath,
    setActivePath,
  } = props;

  const [menuBlocks, setMenuBlocks] = useState(MENU_BLOCKS);

  useEffect(() => {
    if (isLogedIn) {
      setMenuBlocks({
        ...MENU_BLOCKS,
        Admin: 'fa-users-cog',
      });
    } else {
      setMenuBlocks(MENU_BLOCKS);
    }
  }, [isLogedIn]);

  useEffect(() => {
    setPath();
  }, [path]);

  const triggerNavigation = () => {
    setIsOpen(!isOpen);
  };

  const setPath = () => {
    setActivePath(path.replace('/', ''));
  };

  return (
    <>
      <nav className="Navigation">
        <button
          type="button"
          className={classNames('Navigation__trigger', {
            'Navigation__trigger--open': isOpen,
          })}
          onClick={triggerNavigation}
        >
          <div
            className={classNames('Navigation__trigger-line-1', {
              'Navigation__trigger-line-1--open': isOpen,
            })}
          />
          <div
            className={classNames('Navigation__trigger-line-2', {
              'Navigation__trigger-line-2--open': isOpen,
            })}
          />
        </button>
        <ul className="Navigation__menu menu">
          {Object.entries(menuBlocks).map((block, i) => (
            <MenuItem
              block={block}
              isOpen={isOpen}
              isActive={
                activePath
                  ? activePath === block[0].toLocaleLowerCase()
                  : block[0] === 'Home'
              }
              delay={100 + i * 50}
              setIsOpen={setIsOpen}
              setActivePath={setActivePath}
              id={block[0].toLocaleLowerCase()}
              key={block[0]}
            />
          ))}
        </ul>
        <div
          className={classNames('Navigation__back-ground', {
            'Navigation__back-ground--open': isOpen,
          })}
          style={{
            height: isOpen
              ? `${Object.keys(menuBlocks).length * 65}px`
              : '60px',
          }}
        />
      </nav>
    </>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  activePath: PropTypes.string.isRequired,
  setActivePath: PropTypes.func.isRequired,
};

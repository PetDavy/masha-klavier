import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const MenuItem = (props) => {
  const {
    block,
    isOpen,
    isActive,
    delay,
    setIsOpen,
    // setActivePath,
    id,
  } = props;
  const [name, iconClass] = block;
  const history = useHistory();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(isOpen);
    }, isOpen ? delay : 0);
  }, [isOpen]);

  const triggerLink = () => {
    const newPath = id === 'home' ? '' : id;

    setIsOpen(false);
    history.push(`/${newPath}`);
  };

  return (
    <li className="menu__item">
      <div
        className={classNames('menu__link', {
          'menu--active': isActive && isVisible,
        })}
        onClick={triggerLink}
        role="button"
        aria-hidden="true"
      >
        <i
          className={classNames('fas', 'menu__icon', iconClass, {
            'menu--scaled-up': isVisible,
          })}
          style={{ marginRight: isVisible ? '30px' : '0' }}
        />
        <span
          className={classNames('menu__item-name', {
            'menu--scaled-up': isVisible,
            'menu--opacity-up': isVisible,
          })}
        >
          {name}
        </span>
      </div>
    </li>
  );
};

MenuItem.propTypes = {
  block: PropTypes.arrayOf(PropTypes.string).isRequired,
  isOpen: PropTypes.bool.isRequired,
  isActive: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  // setActivePath: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

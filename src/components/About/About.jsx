import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './About.scss';

export const About = ({ isActive }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsShown(true);
    } else {
      setTimeout(() => setIsShown(false), 1000);
    }
  }, [isActive]);

  return (
    <section
      className={classNames('About', { active: isShown })}
      style={{ zIndex: isActive ? '2' : '1' }}
    >
      <h1>About</h1>
    </section>
  );
};

About.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

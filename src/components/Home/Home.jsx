import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TypingText } from './TypingText';
import './Home.scss';

export const Home = ({ isActive, hideMenu }) => {
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
      className={classNames('Home', { active: isShown })}
      style={{ zIndex: isActive ? '2' : '1' }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
    >
      <div className="Home__text">
        <h3 className="Home__text--small">hi there !</h3>
        <h1 className="Home__text--large">
          {`i'm a `}
          <TypingText />
        </h1>
        <p className="Home__paragraph">
          I&apos;m a Freelance UI/UX Designer and Developer based in
          London, England. I strives to build immersive and beautiful web
          applications through carefully crafted code and user-centric design.
        </p>

        <div className="Home__buttons">
          <button
            type="button"
            className="btn btn--acting Home__btn-about"
          >
            <i className="fas fa-user" />
            <span>more about me</span>
          </button>
          <button
            type="button"
            className="btn btn--acting Home__btn-portfolio"
          >
            <i className="fas fa-suitcase" />
            <span>portfolio</span>
          </button>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

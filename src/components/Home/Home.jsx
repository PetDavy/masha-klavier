import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TypingText } from './TypingText';
import { HomeOverlay } from './HomeOverlay';
import './Home.scss';

export const Home = ({ setActiveItem, isActive, hideMenu }) => {
  const [isShown, setIsShown] = useState(false);
  const [onBgChange, setOnBgChange] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [bg, setBg] = useState(1);
  const maxBg = 2;

  useEffect(() => {
    if (isActive) {
      setIsShown(true);
    } else if (isMount) {
      setTimeout(() => setIsShown(false), 1000);
    }
  }, [isActive]);

  useEffect(() => {
    setIsMount(true);

    setInterval(() => {
      setOnBgChange(true);
      setTimeout(() => {
        changeBgImg();
        setOnBgChange(false);
      }, 1000);
    }, 30000);
  }, []);

  const changeBgImg = () => {
    setBg((oldBg) => {
      if (oldBg < maxBg) {
        return oldBg + 1;
      }

      return 1;
    });
  };

  return (
    <section
      className={classNames(`Home Home_bg-${bg}`, {
        active: isShown,
      })}
      style={{
        zIndex: isActive ? '2' : '1',
      }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
    >
      <HomeOverlay onChange={onBgChange} />
      <div className="Home__text">
        <h3 className="Home__text--small">hi there !</h3>
        <h1 className="Home__text--large">
          {`i'm a `}
          <TypingText />
        </h1>
        <p className="Home__paragraph">
          I&apos;m freelance pianist who based in Linz, Austria.
          <br />
          I am inspired by working with people who are inspired by music
        </p>

        <div className="Home__buttons">
          <button
            onClick={() => setActiveItem(1)}
            type="button"
            className="btn btn--acting Home__btn-about"
          >
            <i className="fas fa-user" />
            <span>more about me</span>
          </button>
          <button
            onClick={() => setActiveItem(2)}
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
  setActiveItem: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

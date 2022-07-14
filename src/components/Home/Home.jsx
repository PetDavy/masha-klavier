import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { TypingText } from './TypingText';
import { HomeOverlay } from './HomeOverlay';
import './Home.scss';

// eslint-disable-next-line max-len
export const Home = ({ isActive, images, hideMenu, pathUpdatedFlag, setPathUpdatedFlag }) => {
  const [isShown, setIsShown] = useState(false);
  const [onBgChange, setOnBgChange] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [showcaseImages, setShowcaseImages] = useState([]);
  const [bg, setBg] = useState('');

  const history = useHistory();

  useEffect(() => {
    setOnBgChange(true);
  }, []);

  useEffect(() => {
    if (isActive) {
      setIsShown(true);
    } else if (isMount) {
      setTimeout(() => setIsShown(false), 1000);
    }
  }, [isActive]);

  useEffect(() => {
    if (!images.length) {
      return;
    }

    const showcaseImgs = images.filter(img => img.name.includes('showcase'));

    setShowcaseImages(showcaseImgs);
  }, [images]);

  useEffect(() => {
    if (!showcaseImages.length) {
      return;
    }

    setIsMount(true);
    setOnBgChange(false);
    changeBgImg();

    setInterval(() => {
      setOnBgChange(true);
      setTimeout(() => {
        changeBgImg();
        setOnBgChange(false);
      }, 1000);
    }, 30000);
  }, [showcaseImages]);

  const changeBgImg = () => {
    setBg((oldBg) => {
      const currBgIndex = showcaseImages.findIndex(showcaseImg => (
        showcaseImg.name === oldBg.name
      ));

      if (currBgIndex < showcaseImages.length - 1) {
        return showcaseImages[currBgIndex + 1];
      }

      return showcaseImages[0];
    });
  };

  const triggerLink = (newPath) => {
    history.push(`/${newPath}`);
    setPathUpdatedFlag(!pathUpdatedFlag);
  };

  return (
    <section
      className={classNames('Home', {
        active: isShown,
      })}
      style={{
        zIndex: isActive ? '2' : '1',
        backgroundImage: `url(${bg.url})`,
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
            onClick={() => triggerLink('about')}
            type="button"
            className="btn btn--acting Home__btn-about"
          >
            <i className="fas fa-user" />
            <span>more about me</span>
          </button>
          <button
            onClick={() => triggerLink('portfolio')}
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
  // setIsOpen: PropTypes.func.isRequired,
  // path: PropTypes.string.isRequired,
  // setActivePath: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  hideMenu: PropTypes.func.isRequired,
  pathUpdatedFlag: PropTypes.bool.isRequired,
  setPathUpdatedFlag: PropTypes.func.isRequired,
};

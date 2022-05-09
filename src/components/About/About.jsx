import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './About.scss';
import aboutPicture from '../../media/about-img.jpg';
import data from '../../data.json';

export const About = ({ isActive, hideMenu, activePath }) => {
  const [isShown, setIsShown] = useState(false);
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsShown(true);
    } else if (isMount) {
      setTimeout(() => setIsShown(false), 1000);
    }
  }, [isActive]);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <section
      className={classNames('About', { active: isShown })}
      style={{ zIndex: isActive ? '2' : '1' }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
    >
      <div className="About__title">
        <h2 className="About__main-title">
          about
          <span className="About__title--colored"> me</span>
        </h2>
        <h3 className="About__sub-title">
          I play the best music in the world, and I love what I do.
        </h3>
      </div>
      <div className="About__info">
        <div className="About__picture-wrapper">
          <img
            src={aboutPicture}
            alt="Masha About"
            className="About__picture"
          />
          <div className="About__picture-frame" />
        </div>
        <div className="About__text">
          <div className="About__columns">
            <ul className="About__column">
              <li>
                First Name
                <span> Mariia</span>
              </li>
              <li>
                Last Name
                <span> Pankiv</span>
              </li>
              <li>
                Birthdate
                <span> 08 july 1990</span>
              </li>
              <li>
                Nationality
                <span> Ukrainian</span>
              </li>
              <li>
                Experience
                <span> 16 years</span>
              </li>
              <li>
                Address
                <span> Linz, Austria </span>
              </li>
            </ul>
            <ul className="About__column">
              <li>
                Freelance
                <span>Available</span>
              </li>
              <li>
                Langages
                <span> German, English, Ukrainian, Russian </span>
              </li>
              <li>
                Phone
                &nbsp;
                <a
                  className="About__link"
                  href="tel:+4368184847049"
                >
                  +43 681 8484 7049
                </a>
              </li>
              <li>
                Email
                &nbsp;
                <a
                  className="About__link"
                  href="mailto:maschaklavier@gmail.com"
                >
                  maschaklavier@gmail.com
                </a>
              </li>
              <li>
                Theapolis
                &nbsp;
                <a
                  className="About__link"
                  // eslint-disable-next-line max-len
                  href="https://www.theapolis.de/en/profile/show/mariia-pankiv-1?fbclid=IwAR0m8Q2GyZ0wGB1AF8svFskoPL68qwGlxh-_xwqkQhSjAH6f7oMr1Nmeu7A"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mariia Pankiv
                </a>
              </li>
            </ul>
          </div>
          <div className="btn btn--acting About__btn">
            <i className="fas fa-download" />
            <span>watch my cv</span>
          </div>
        </div>
      </div>
      <div className="About__separator" />
      <div className="About__general-info">
        {data.about['general-info'].map((infoData, index) => {
          const dataBlocks = Object.keys(infoData);

          return (
            <div className="About__data" key={`${dataBlocks[index]}-block`}>
              {dataBlocks.map(key => (
                <React.Fragment key={key}>
                  <ul className="About__data-list">
                    <li className="About__data-title">
                      {key}
                    </li>
                    {infoData[key].map(itemData => (
                      <li
                        className="About__data-item"
                        key={`${itemData.name}${itemData.date}`}
                      >
                        <span className="About__icon-calendar">
                          <i className="fas fa-calendar-alt" />
                          {itemData.date}
                        </span>
                        <p className="About__data-item-title">
                          {itemData.name}
                        </p>
                        <span className="About__data-item-location">
                          {itemData.location}
                        </span>
                        <p className="About__data-item-text">
                          {itemData.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ))}
            </div>

          );
        })}
      </div>
    </section>
  );
};

About.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
  activePath: PropTypes.string.isRequired,
};

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './About.scss';
import aboutPicture from '../../media/about-picture.jpg';
import data from '../../data.json';

export const About = ({ isActive, hideMenu }) => {
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
                <span> Daria</span>
              </li>
              <li>
                Last Name
                <span> Taylor</span>
              </li>
              <li>
                Birthdate
                <span> 21 june 1990</span>
              </li>
              <li>
                Nationality
                <span> English</span>
              </li>
              <li>
                Experience
                <span> 7 years</span>
              </li>
              <li>
                Address
                <span> Istanbul</span>
              </li>
            </ul>
            <ul className="About__column">
              <li>
                Freelance
                <span>Available</span>
              </li>
              <li>
                Langages
                <span> English</span>
              </li>
              <li>
                Phone
                <span> +34 21 18 40 10</span>
              </li>
              <li>
                Email
                <span> you@you.com</span>
              </li>
              <li>
                Skype
                <span> daria.taylor</span>
              </li>
              <li>
                Dribbble
                <span> taylor.dribbble</span>
              </li>
            </ul>
          </div>
          <div className="btn btn--acting About__btn">
            <i className="fas fa-download" />
            <span>download my cv</span>
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
                  <h2 className="About__data-title">{key}</h2>
                  <ul className="About__data-list">
                    {infoData[key].map(itemData => (
                      <li className="About__data-item" key={itemData.name}>
                        <span className="About__icon-calendar">
                          <i className="fas fa-calendar-alt" />
                          {itemData.date}
                        </span>
                        <p className="About__data-item-title">
                          {itemData.name}
                        </p>
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
};

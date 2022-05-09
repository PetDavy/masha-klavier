/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import classNames from 'classnames';
import './Contacts.scss';
import PropTypes from 'prop-types';

export const Contacts = ({ isActive, hideMenu, activePath }) => {
  const [isShown, setIsShown] = useState(false);
  const [isMount, setIsMount] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_zpisyjl', 'contact_form', e.target, 'user_PPIRgOMV7FJ2DYS5ML70X')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset();
  };

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
      className={classNames('Contacts', { active: isShown })}
      style={{ zIndex: isActive ? '2' : '1' }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
    >
      <div className="Contacts__title">
        <h2 className="Contacts__main-title">
          get
          <span className="Contacts__title--colored"> in touch</span>
        </h2>
        <h3 className="Contacts__sub-title">
          I&apos;m always open to discussing product or partnerships.
        </h3>
      </div>
      <div className="Contacts__content">
        <div className="Contacts__info">
          <div className="Contacts__contact">
            <p className="Contacts__contact-name">Phone</p>
            <p className="Contacts__contact-data">
              <i className="fas fa-phone-square-alt" />
              <a href="tel:+4368184847049">+43 681 8484 7049</a>
            </p>
          </div>
          <div className="Contacts__contact">
            <p className="Contacts__contact-name">Email</p>
            <p className="Contacts__contact-data">
              <i className="far fa-envelope" />
              <a href="mailto:maschaklavier@gmail.com">maschaklavier@gmail.com</a>
            </p>
          </div>
          <div className="Contacts__contact">
            <p className="Contacts__contact-name">Theapolis</p>
            <p className="Contacts__contact-data">
              <i className="fas fa-music" />
              <a href="https://www.theapolis.de/en/profile/show/mariia-pankiv-1?fbclid=IwAR0m8Q2GyZ0wGB1AF8svFskoPL68qwGlxh-_xwqkQhSjAH6f7oMr1Nmeu7A">
                theapolis.de/mariia-pankiv
              </a>
            </p>
          </div>
          <div className="Contacts__contact">
            <p className="Contacts__contact-name">Social Profiles</p>
            <div className="Contacts__links">
              <a href="https://www.youtube.com/channel/UCA7bNldClDWu_AhXoe-pyrQ/featured" className="Contacts__link">
                <i className="fab fa-youtube" />
              </a>
              <a href="https://soundcloud.com/user-992027444?fbclid=IwAR20DzNYYhWuW2SGPFj0b9cjTzlajg9go137c8kjsPWhiFv42VGWvj8w70Y" className="Contacts__link">
                <i className="fab fa-soundcloud" />
              </a>
              <a href="https://www.theapolis.de/en/profile/show/mariia-pankiv-1?fbclid=IwAR0m8Q2GyZ0wGB1AF8svFskoPL68qwGlxh-_xwqkQhSjAH6f7oMr1Nmeu7A" className="Contacts__link">
                <i className="fas fa-music" />
              </a>
            </div>
          </div>
        </div>
        <div className="Contacts__form-container">
          <p className="Contacts__form-summary">
            If you have any suggestion, project or even you want to say Hello.. please fill out the form below and I will reply you shortly.
          </p>
          <form
            action="#"
            onSubmit={sendEmail}
            className="Contacts__form"
          >
            <label className="Contacts__label Contacts__label--half">
              <i className="fas fa-user" />
              <input
                type="text"
                className="Contacts__input"
                placeholder="your name"
                name="user_name"
                required
              />
            </label>
            <label className="Contacts__label Contacts__label--half">
              <i className="fas fa-envelope" />
              <input
                type="text"
                className="Contacts__input"
                placeholder="your email"
                name="user_email"
                required
              />
            </label>
            <label className="Contacts__label">
              <i className="fas fa-comments" />
              <textarea
                className="Contacts__textarea"
                placeholder="your message"
                name="message"
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn--acting Contacts__btn"
            >
              <i className="fab fa-telegram-plane" />
              <span>send message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

Contacts.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
  activePath: PropTypes.string.isRequired,
};

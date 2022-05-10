import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.scss';

export const LoginForm = ({ auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const logIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('Logged in');
      })
      .catch((error) => {
        if (error.message.includes('Firebase')) {
          setErrorMessage(error.message.split(': ')[1]);
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  return (
    <form
      action="#"
      onSubmit={logIn}
      className="LoginForm__form"
    >
      {errorMessage && (
        <div className="LoginForm__error-message">
          <span>
            {errorMessage}
          </span>
        </div>
      )}
      <label className="LoginForm__label LoginForm__label">
        <i className="fas fa-user" />
        <input
          type="email"
          className="LoginForm__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your email"
          name="email"
          required
        />
      </label>
      <label className="LoginForm__label LoginForm__label">
        <i className="fas fa-envelope" />
        <input
          type="password"
          className="LoginForm__input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="your password"
          name="password"
          required
        />
      </label>
      <button
        type="submit"
        className="btn btn--acting LoginForm__btn"
      >
        <i className="fab fa-telegram-plane" />
        <span>log in</span>
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
};

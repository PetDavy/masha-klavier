import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LoginForm.scss';

export const LoginForm = ({ auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <form
      action="#"
      onSubmit={logIn}
      className="LoginForm__form"
    >
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

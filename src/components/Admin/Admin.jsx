/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { signOut } from 'firebase/auth';
import { LoginForm } from './LoginForm';
import { AdminPanel } from './AdminPanel';
import './Admin.scss';

export const Admin = ({ isActive, hideMenu, isLogedIn, auth, db, storage, activePath, videos, videoPreviews }) => {
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

  const userSignOut = () => {
    signOut(auth).then(() => {
      // eslint-disable-next-line no-console
      console.log('user signed out');
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  };

  return (
    <section
      className={classNames('Admin', { active: isShown })}
      style={{ zIndex: isActive ? '2' : '1' }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
    >
      <div className="Admin__title">
        <h2 className="Admin__main-title">
          {isLogedIn ? 'Admin' : 'Log'}
          <span className="Admin__title--colored">
            {isLogedIn ? ' cabinet' : ' in'}
          </span>
        </h2>
        <h3 className="Admin__sub-title">
          {isLogedIn ? ' Configure your site data' : 'Write your email and password'}
        </h3>
        {isLogedIn && (
          <button
            className="Admin__logout-btn"
            onClick={userSignOut}
            type="button"
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </div>
      {!isLogedIn && <LoginForm auth={auth} />}
      {isLogedIn && <AdminPanel videos={videos} db={db} storage={storage} videoPreviews={videoPreviews} />}
    </section>
  );
};

Admin.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
  isLogedIn: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  db: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storage: PropTypes.object.isRequired,
  activePath: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    project: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    preview: PropTypes.string,
    slug: PropTypes.string,
  })).isRequired,
  videoPreviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

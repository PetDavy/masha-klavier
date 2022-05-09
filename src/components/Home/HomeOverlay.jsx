import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const HomeOverlay = ({ onChange }) => (
  <div
    className={classNames('Home__overlay', {
      'Home__overlay--dark': onChange,
    })}
  />
);

HomeOverlay.propTypes = {
  onChange: PropTypes.bool.isRequired,
};

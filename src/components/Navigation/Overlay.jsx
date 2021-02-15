import React from 'react';
import PropTypes from 'prop-types';

export const Overlay = ({ hideMenu }) => (
  <div
    className="Overlay"
    onClick={hideMenu}
    role="button"
    aria-hidden="true"
  />
);

Overlay.propTypes = {
  hideMenu: PropTypes.func.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import './VideoPlayer.scss';

export const SoundCloudPlayer = ({ url }) => (
  <iframe
    scrolling="no"
    frameBorder="no"
    allow="autoplay"
    title="videoPlayer"
    src={url}
    className="VideoPlayer__iframe"
  />
);

SoundCloudPlayer.propTypes = {
  url: PropTypes.string,
};

SoundCloudPlayer.defaultProps = {
  url: '',
};

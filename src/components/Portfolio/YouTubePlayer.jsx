import React from 'react';
import PropTypes from 'prop-types';
import './VideoPlayer.scss';

export const YouTubePlayer = ({ url }) => {
  const baseUrl = 'https://www.youtube.com/embed/';

  return (
    <iframe
      id="player"
      src={`${baseUrl}${url}`}
      frameBorder="0"
      allow="accelerometer;
      autoplay;
      encrypted-media;
      gyroscope;
      picture-in-picture"
      allowFullScreen
      title="videoPlayer"
      className="VideoPlayer__iframe"
    />
  );
};

YouTubePlayer.propTypes = {
  url: PropTypes.string.isRequired,
};

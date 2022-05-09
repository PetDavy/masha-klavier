import React from 'react';
import PropTypes from 'prop-types';
import { backgroundImg } from '../../utils/setImgBackground';

export const PortfolioVideoFrame = ({ video, openVideoPlayer }) => {
  const background = backgroundImg(video);

  return (
    <div
      className="Portfolio__video"
      key={video.name}
      style={background}
      onClick={() => openVideoPlayer(video)}
      role="button"
      aria-hidden="true"
    >
      <div className="Portfolio__video-bg" />
      <div className="Portfolio__video-name">
        {video.name}
      </div>
      <span className="Portfolio__video-play-btn">
        <i className="Portfolio__video-play-icon fas fa-play" />
      </span>
    </div>
  );
};

PortfolioVideoFrame.propTypes = {
  video: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    videoImg: PropTypes.string,
    videoExternalImg: PropTypes.string,
    videoImgAlign: PropTypes.string,
  }),
  openVideoPlayer: PropTypes.func.isRequired,
};

PortfolioVideoFrame.defaultProps = {
  video: PropTypes.shape({
    name: '',
    url: '',
    soundCloudUrl: '',
    videoImgAlign: '',
  }),
};

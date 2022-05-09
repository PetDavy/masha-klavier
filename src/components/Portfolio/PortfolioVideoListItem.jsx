import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { backgroundImg } from '../../utils/setImgBackground';

export const PortfolioVideoListItem = (props) => {
  const { video, playVideo, onHover, isOpen, delay } = props;
  const [onScale, setOnScale] = useState(onHover);

  useEffect(() => {
    let scale = false;

    if (onHover && isOpen) {
      scale = true;
    }

    setTimeout(() => setOnScale(scale), delay);
  }, [onHover, isOpen]);

  return (
    <li
      className={classNames('Portfolio__video-list-item',
        {
          'Portfolio__video-list-item--scaled': onScale,
        })}
      key={video.name}
      onClick={() => playVideo(video)}
      aria-hidden="true"
    >
      <div
        className="Portfolio__video-list-img"
        style={backgroundImg(video)}
      >
        <i className="Portfolio__play-icon-list fas fa-play" />
      </div>
      {video.name}
    </li>
  );
};

PortfolioVideoListItem.propTypes = {
  video: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    videoImg: PropTypes.string,
    videoExternalImg: PropTypes.string,
    videoImgAlign: PropTypes.string,
  }),
  playVideo: PropTypes.func.isRequired,
  onHover: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  delay: PropTypes.number.isRequired,
};

PortfolioVideoListItem.defaultProps = {
  video: PropTypes.shape({
    name: '',
    url: '',
    soundCloudUrl: '',
    videoImgAlign: '',
  }),
};

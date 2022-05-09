import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { backgroundImg } from '../../utils/setImgBackground';
import { PortfolioVideoListItem } from './PortfolioVideoListItem';

export const PortfolioVideoList = (props) => {
  const { isOpen, onHover, videosList, openVideoPlayer } = props;

  const playVideo = (video) => {
    openVideoPlayer(video, videosList);
  };

  const getListHeight = (length) => {
    if (length > 3) {
      return 60 * 3 + 50;
    }

    return length * 60 + 40;
  };

  const getScaleDelay = (index) => {
    if (videosList.length > 3 && index <= 3) {
      return (400 / 3) * index;
    }

    if (videosList.length > 3) {
      return 400;
    }

    return (400 / videosList.length) * index;
  };

  return (
    <div
      className={classNames('Portfolio__video-list-wrapper',
        {
          'Portfolio__video-list-wrapper--open': isOpen,
          'Portfolio__video-list-wrapper--scroll': videosList.length > 3,
        })}
      style={
        {
          height: onHover && isOpen
            ? `${getListHeight(videosList.length)}px`
            : '0',
        }
      }
    >
      <ul
        className="Portfolio__video-list"
      >
        {videosList.sort((vA, vB) => vA.order - vB.order).map((video, i) => (
          <PortfolioVideoListItem
            key={video.name}
            video={video}
            playVideo={playVideo}
            onHover={onHover}
            isOpen={isOpen}
            delay={getScaleDelay(i)}
          />
        ))}
      </ul>
    </div>
  );
};

PortfolioVideoList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onHover: PropTypes.bool.isRequired,
  videosList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    videoImg: PropTypes.string,
    videoImgAlign: PropTypes.string,
  })).isRequired,
  openVideoPlayer: PropTypes.func.isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PortfolioVideoList } from './PortfolioVideoList';
import { backgroundImg } from '../../utils/setImgBackground';

export const VideoListFrame = ({ video, openVideoPlayer, videosList }) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const background = backgroundImg(video);
  // eslint-disable-next-line max-len
  const sortedVideoList = videosList.sort((videoA, videoB) => videoA.listOrder - videoB.listOrder);

  return (
    <div
      className={classNames('Portfolio__video-list-container',
        {
          'Portfolio__video-list-container--hovered': onHover,
        })}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div
        className="Portfolio__video"
        style={background}
        onClick={() => setIsOpenList(!isOpenList)}
        role="button"
        aria-hidden="true"
      >
        <div className="Portfolio__video-bg" />
        <div className="Portfolio__video-name">{video.slug}</div>
        <span
          className="Portfolio__video-list-btn"
          onClick={() => setIsOpenList(!isOpenList)}
          role="button"
          aria-hidden="true"
        >
          <i className="Portfolio__video-list-icon fas fa-list" />
        </span>
      </div>
      <PortfolioVideoList
        isOpen={isOpenList}
        onHover={onHover}
        videosList={sortedVideoList}
        openVideoPlayer={openVideoPlayer}
      />
    </div>
  );
};

VideoListFrame.propTypes = {
  video: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    videoImg: PropTypes.string,
    videoExternalImg: PropTypes.string,
    videoImgAlign: PropTypes.string,
    slug: PropTypes.string,
  }),
  openVideoPlayer: PropTypes.func.isRequired,
  videosList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    videoImg: PropTypes.string,
    videoImgAlign: PropTypes.string,
    slug: PropTypes.string.isRequired,
  })).isRequired,
};

VideoListFrame.defaultProps = {
  video: PropTypes.shape({
    name: '',
    url: '',
    soundCloudUrl: '',
    videoImgAlign: '',
  }),
};

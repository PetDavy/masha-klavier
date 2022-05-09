import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { VideoPlayer } from './VideoPlayer';
import { PortfolioVideoFrame } from './PortfolioVideoFrame';
import { VideoListFrame } from './VideoListFrame';
import './Portfolio.scss';

export const Portfolio = ({ isActive, hideMenu, activePath, videos }) => {
  const [isShown, setIsShown] = useState(false);
  const [onPlayMode, setOnPlayMode] = useState(false);
  const [activVideo, setActiveVideo] = useState({});
  const [activVideoList, setActiveVideoLIst] = useState([]);
  const slugs = {};

  useEffect(() => {
    if (isActive) {
      setIsShown(true);
    } else {
      setTimeout(() => {
        setIsShown(false);
        setOnPlayMode(false);
      }, 1000);
    }
  }, [isActive]);

  const openVideoPlayer = (video, videoList) => {
    setOnPlayMode(true);
    setActiveVideo(video);

    if (videoList) {
      setActiveVideoLIst(videoList);
    } else {
      setActiveVideoLIst([]);
    }
  };

  const closeVideoPlayer = () => {
    setOnPlayMode(false);
    setTimeout(() => setActiveVideo({}), 500);
  };

  const getMultipleVideos = slug => (
    videos.filter(video => video.slug === slug)
  );

  const renderListFrame = (video) => {
    if (slugs[video.slug]) {
      return null;
    }

    slugs[video.slug] = true;

    return (
      <VideoListFrame
        key={video.name}
        video={video}
        openVideoPlayer={openVideoPlayer}
        videosList={getMultipleVideos(video.slug)}
      />
    );
  };

  return (
    <section
      className={classNames('Portfolio', { active: isShown })}
      style={{
        zIndex: isActive ? '2' : '1',
      }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
    >
      <div
        className={classNames('Portfolio__overlay', {
          'Portfolio__overlay--on': onPlayMode,
        })}
        onClick={() => closeVideoPlayer()}
        role="button"
        aria-hidden="true"
      />
      <div
        className={classNames('Portfolio__wrapper', {
          'Portfolio__wrapper--shift': onPlayMode,
        })}
      >
        <div className="Portfolio__title">
          <h2 className="Portfolio__main-title">
            my
            <span className="Portfolio__title--colored"> portfolio</span>
          </h2>
          <h3 className="Portfolio__sub-title">
            a few recent concerts. want to see more? email me.
          </h3>
        </div>
        <div className="Portfolio__videos">
          {videos.map(video => (
            video.slug
              ? renderListFrame(video)
              : (
                <PortfolioVideoFrame
                  key={video.name}
                  video={video}
                  openVideoPlayer={openVideoPlayer}
                />
              )
          ))}
        </div>
      </div>
      <VideoPlayer
        onPlayMode={onPlayMode}
        activVideo={activVideo}
        activeVideoList={activVideoList}
        closeVideoPlayer={closeVideoPlayer}
        setActiveVideo={setActiveVideo}
      />
    </section>
  );
};

Portfolio.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
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
};

import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { YouTubePlayer } from './YouTubePlayer';
import { SoundCloudPlayer } from './SoundCloudPlayer';
import { backgroundImg } from '../../utils/setImgBackground';
import './VideoPlayer.scss';

export const VideoPlayer = (props) => {
  const { onPlayMode, activVideo, activeVideoList, closeVideoPlayer } = props;
  const { setActiveVideo } = props;

  return (
    <div
      className={classNames('VideoPlayer', {
        'VideoPlayer--shown': onPlayMode,
      })}
    >
      <div className="VideoPlayer__container">
        {
          activVideo.url
            ? <YouTubePlayer url={activVideo.url} />
            : <SoundCloudPlayer url={activVideo.soundCloudUrl} />
        }
      </div>
      <div className="VideoPlayer__info">
        <div className="VideoPlayer__sub-video-row">
          <h2 className="VideoPlayer__title">
            {activVideo.name}
          </h2>
          <button
            onClick={closeVideoPlayer}
            type="button"
            className="btn btn--acting VideoPlayer__btn"
          >
            <i className="fas fa-times" />
            <span>close</span>
          </button>
        </div>
        <ul className="VideoPlayer__list">
          {activVideo.project && (
            <li className="VideoPlayer__list-item">
              <i className="fas fa-music" />
              <span className="VideoPlayer__list-name">project:</span>
              <span>{activVideo.project}</span>
            </li>
          )}
          {activVideo.participants && (
            <li className="VideoPlayer__list-item">
              <i className="fas fa-users" />
              <span className="VideoPlayer__list-name">participants:</span>
              <span>
                {activVideo.participants.map(participant => (
                  <span key={participant}>
                    {participant}
                    <br />
                  </span>
                ))}
              </span>
            </li>

          )}
          {activVideo.location && (
            <li className="VideoPlayer__list-item">
              <i className="fas fa-map" />
              <span className="VideoPlayer__list-name">location:</span>
              <span>{activVideo.location}</span>
            </li>
          )}
        </ul>
        {activeVideoList.length > 0 && (
          <ul className="VideoPlayer__video-list">
            {activeVideoList.map(video => (
              <li
                key={video.name}
                className={classNames('VideoPlayer__video-list-item', {
                  'VideoPlayer__video-list-item--active':
                  activVideo.name === video.name,
                })}
                aria-hidden="true"
                onClick={() => setActiveVideo(video)}
              >
                <div
                  className="VideoPlayer__video-list-img"
                  style={backgroundImg(video)}
                />
                {video.name}
              </li>
            ))}
          </ul>
        )}

        {activVideo.preview && (
          <a
            target="__blank"
            href={activVideo.preview}
            className="btn btn--acting VideoPlayer__btn-previw"
          >
            <i className="fa fa-external-link" />
            <span>preview</span>
          </a>
        )}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  onPlayMode: PropTypes.bool.isRequired,
  activVideo: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    project: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    preview: PropTypes.string,
  }),
  activeVideoList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    project: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    preview: PropTypes.string,
  })),
  closeVideoPlayer: PropTypes.func.isRequired,
  setActiveVideo: PropTypes.func.isRequired,
};

VideoPlayer.defaultProps = {
  activVideo: PropTypes.shape({
    name: '',
    url: '',
    soundCloudUrl: '',
    project: '',
    participants: '',
    location: '',
    preview: '',
  }),
  activeVideoList: PropTypes.arrayOf(PropTypes.shape({
    name: '',
    url: '',
    soundCloudUrl: '',
    project: '',
    participants: '',
    location: '',
    preview: '',
  })),
};

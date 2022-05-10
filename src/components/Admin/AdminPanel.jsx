/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { AdminDisplay } from './AdminDisplay';
import { AdminAddVideoForm } from './AdminAddVideoForm';
import { ConfirmModal } from './ConfirmModal';
import { getTopOrder, getTopListOrder } from '../../utils/orderUtils';
import './AdminPanel.scss';

export const AdminPanel = ({ videos, db, storage, videoPreviews }) => {
  const [activeVideo, setActiveVideo] = useState(null);
  const [deletVideo, setDeletVideo] = useState(null);
  const [videoList, setVideoList] = useState([]);
  const [activeTab, setActiveTab] = useState('videos');
  const slugs = {};

  useEffect(() => {
    if (activeVideo) {
      setActiveVideo(videos.find(video => video.id === activeVideo.id));
    }

    setVideoList(videos.sort((vA, vB) => vA.order - vB.order));
  }, [videos]);

  const getMultipleVideos = slug => (
    videoList.filter(video => video.slug === slug)
      .sort((videoA, videoB) => videoA.listOrder - videoB.listOrder)
  );

  const deleteVideo = async(video) => {
    try {
      await deleteDoc(doc(db, 'videos', video.id));

      if (video.videoImg) {
        const imageToDelete = videoPreviews.find(preview => preview.url === video.videoImg);

        if (imageToDelete) {
          const desertRef = ref(storage, `video-previews/${imageToDelete.name}`);

          await deleteObject(desertRef);
        }
      }
    } catch (error) {
      console.log('Couldn/t delet video or video image: ', error);
    }
  };

  const changeMultiVideosOrder = async(multiVideos, newOrder) => {
    multiVideos.forEach(async(nextVideo) => {
      try {
        const videoRef = doc(db, 'videos', nextVideo.id);

        await setDoc(videoRef, {
          ...nextVideo,
          order: newOrder,
        });
      } catch (error) {
        console.error('Couldn\'t move video: ', error);
      }
    });
  };

  const changeCurrentVideoOrder = async(video, newOrder) => {
    try {
      const videoRef = doc(db, 'videos', video.id);

      await setDoc(videoRef, {
        ...video,
        order: newOrder,
      });
    } catch (error) {
      console.error('Couldn\'t move video: ', error);
    }
  };

  const moveVideo = async(video, direction) => {
    if (video.slug) {
      moveVideoOfMultiList(video, direction);

      return;
    }

    const nextVideoOrder = direction === 'DOWN' ? video.order + 1 : video.order - 1;

    if ((direction === 'DOWN' && video.order === getTopOrder(videos)) || (direction === 'UP' && video.order === 0)) {
      return;
    }

    const nextVideoList = videos.filter(listVideo => listVideo.order === nextVideoOrder);

    changeMultiVideosOrder(nextVideoList, video.order);
    changeCurrentVideoOrder(video, nextVideoOrder);
  };

  const moveMultiVideo = async(multiVideos, direction) => {
    const orderId = multiVideos[0].order;
    const nextVideoOrder = direction === 'DOWN' ? orderId + 1 : orderId - 1;

    if ((direction === 'DOWN' && orderId === getTopOrder(videos)) || (direction === 'UP' && orderId === 0)) {
      return;
    }

    const nextVideoList = videos.filter(listVideo => listVideo.order === nextVideoOrder);

    changeMultiVideosOrder(nextVideoList, orderId);
    changeMultiVideosOrder(multiVideos, nextVideoOrder);
  };

  const moveVideoOfMultiList = async(video, direction) => {
    const nextVideoListOrder = direction === 'DOWN' ? video.listOrder + 1 : video.listOrder - 1;
    const videosOfMultiList = getMultipleVideos(video.slug);

    if ((direction === 'DOWN' && video.listOrder === getTopListOrder(videosOfMultiList)) || (direction === 'UP' && video.listOrder === 1)) {
      return;
    }

    const nextVideo = videosOfMultiList.find(listVideo => listVideo.listOrder === nextVideoListOrder);

    try {
      const videoRef = doc(db, 'videos', nextVideo.id);

      await setDoc(videoRef, {
        ...nextVideo,
        listOrder: video.listOrder,
      });
    } catch (error) {
      console.error('Couldn\'t move video: ', error);
    }

    try {
      const videoRef = doc(db, 'videos', video.id);

      await setDoc(videoRef, {
        ...video,
        listOrder: nextVideoListOrder,
      });
    } catch (error) {
      console.error('Couldn\'t move video: ', error);
    }
  };

  const singleVideo = video => (
    <div
      className={classNames('AdminPanel__video', {
        'AdminPanel__video--active': video.name === activeVideo?.name,
      })}
      key={video.name}
      onClick={() => setActiveVideo(video)}
      onKeyDown={() => setActiveVideo(video)}
      role="button"
      tabIndex="0"
    >
      <div className="AdminPanel__video-name">
        {video.name}
      </div>
      {video.name === activeVideo?.name && (
        <i
          className="AdminPanel__delete-icon fas fa-trash-alt"
          onClick={() => setDeletVideo(video)}
          onKeyDown={() => setDeletVideo(video)}
          role="button"
          tabIndex="0"
        />
      )}
      <div className="AdminPanel__video-moves">
        <span
          className="AdminPanel__video-move-btn"
          onClick={() => moveVideo(video, 'UP')}
          onKeyDown={() => moveVideo(video, 'UP')}
          role="button"
          tabIndex="0"
        >
          <svg width="9" height="7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.4 7h7.8c.5 0 .5-.8.4-1.3l-.1-.4L4.9.4C4.6 0 4.1 0 3.8.4l-3.6 5-.2.3C0 6.2 0 7 .4 7Z" fill="#fff" /></svg>
        </span>
        <span
          className="AdminPanel__video-move-btn"
          onClick={() => moveVideo(video, 'DOWN')}
          onKeyDown={() => moveVideo(video, 'DOWN')}
          role="button"
          tabIndex="0"
        >
          <svg width="9" height="7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m.2 1.7 3.6 4.9c.3.5.8.5 1.1 0l3.6-5 .1-.3c0-.5.1-1.3-.4-1.3H.4C0 0 0 .8 0 1.3l.2.4Z" fill="#fff" /></svg>
        </span>
      </div>
    </div>
  );

  const multipleVideo = (video) => {
    slugs[video.slug] = true;

    const toggleList = (event) => {
      const { target } = event;
      const listContainerElement = target.parentElement;

      listContainerElement.classList.toggle('AdminPanel__multi-video--open');
    };

    return (
      <div
        className="AdminPanel__multi-video AdminPanel__video"
        key={video.slug}
      >
        <input
          type="checkbox"
          name="util-checkbox"
          id={`util-checkbox-${video.name}`}
          className="AdminPanel__util-checkbox"
          onChange={toggleList}
        />
        <div
          className={classNames(
            'AdminPanel__video-name',
            'AdminPanel__video-name-slug',
            { 'AdminPanel__video-name--active': video.slug === activeVideo?.slug },
          )}
        >
          {video.slug}
        </div>
        <label
          htmlFor={`util-checkbox-${video.name}`}
          className="AdminPanel__video-label"
        >
          <span className="AdminPanel__video-label-plus">
            <i className="fas fa-chevron-down" />
          </span>
          <span className="AdminPanel__video-label-minus">
            <i className="fas fa-chevron-up" />
          </span>
        </label>
        {getMultipleVideos(video.slug).map(inVideo => singleVideo(inVideo))}
        <div className="AdminPanel__video-moves">
          <span
            className="AdminPanel__video-move-btn"
            onClick={() => moveMultiVideo(getMultipleVideos(video.slug), 'UP')}
            onKeyDown={() => moveMultiVideo(getMultipleVideos(video.slug), 'UP')}
            role="button"
            tabIndex="0"
          >
            <svg width="9" height="7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.4 7h7.8c.5 0 .5-.8.4-1.3l-.1-.4L4.9.4C4.6 0 4.1 0 3.8.4l-3.6 5-.2.3C0 6.2 0 7 .4 7Z" fill="#fff" /></svg>
          </span>
          <span
            className="AdminPanel__video-move-btn"
            onClick={() => moveMultiVideo(getMultipleVideos(video.slug), 'DOWN')}
            onKeyDown={() => moveMultiVideo(getMultipleVideos(video.slug), 'DOWN')}
            role="button"
            tabIndex="0"
          >
            <svg width="9" height="7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m.2 1.7 3.6 4.9c.3.5.8.5 1.1 0l3.6-5 .1-.3c0-.5.1-1.3-.4-1.3H.4C0 0 0 .8 0 1.3l.2.4Z" fill="#fff" /></svg>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="AdminPanel">
      {deletVideo && (
        <ConfirmModal
          executeFunc={deleteVideo}
          funcParam={deletVideo}
          setDeletVideo={setDeletVideo}
        />
      )}
      <div className="AdminPanel__tabs">
        <div
          className={classNames('AdminPanel__tab', {
            'AdminPanel__tab--active': activeTab === 'videos',
          })}
          onClick={() => setActiveTab('videos')}
          onKeyDown={() => setActiveTab('videos')}
          role="button"
          tabIndex="0"
        >
          Videos
        </div>
        <div
          className={classNames('AdminPanel__tab', {
            'AdminPanel__tab--active': activeTab === 'general',
          })}
          onClick={() => setActiveTab('general')}
          onKeyDown={() => setActiveTab('general')}
          role="button"
          tabIndex="0"
        >
          General
        </div>
      </div>
      {activeTab === 'videos' && (
        <div className="AdminPanel__videos">
          <div className="AdminPanel__videos-list">
            <AdminAddVideoForm db={db} storage={storage} videos={videoList} videoPreviews={videoPreviews} />
            {videoList.map((video) => {
              if (!video.slug) {
                return singleVideo(video);
              }

              if (video.slug && !slugs[video.slug]) {
                return multipleVideo(video);
              }

              return null;
            })}
          </div>
          <div className="AdminPanel__videos-display">
            {activeVideo && (
              <AdminDisplay videos={videoList} video={activeVideo} db={db} storage={storage} videoPreviews={videoPreviews} />
            )}
          </div>
        </div>
      )}
      {activeTab === 'general' && (
        <div className="AdminPanel__general">
          General
        </div>
      )}
    </div>
  );
};

AdminPanel.propTypes = {
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
  // eslint-disable-next-line react/forbid-prop-types
  db: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storage: PropTypes.object.isRequired,
  videoPreviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

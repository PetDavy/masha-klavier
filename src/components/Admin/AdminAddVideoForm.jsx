/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import PropTypes from 'prop-types';
import { AdminAddVideoFormParticipationInput } from './AdminAddVideoFormParticipationInput';
import { getListOrder, getAvailableOrder } from '../../utils/orderUtils';
import './AdminAddVideoForm.scss';

export const AdminAddVideoForm = ({ db, storage, videos, videoPreviews }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [soundCloudUrl, setSoundCloudUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageBlobFile, setImageBlobFile] = useState(null);
  const [slug, setSlug] = useState('');
  const [participations, setParticipations] = useState(['']);
  const [participActivInput, setParticipActivInput] = useState(null);

  const windowURL = window.URL || window.webkitURL;

  useEffect(() => {
    if (!participations.length) {
      setParticipations(['']);
    }
  }, [participations]);

  const setImageFile = (target) => {
    const imageFile = target.files[0];

    if (!imageFile.type.startsWith('image')) {
      // eslint-disable-next-line no-alert
      alert(`файл ${imageFile.name} не є зображенням або файлом потрібного формату`);

      return;
    }

    setImageUrl(windowURL.createObjectURL(imageFile));
    setImageBlobFile(imageFile);

    // eslint-disable-next-line no-console
    console.log(imageFile);
  };

  const setParticipationValue = (value, index) => {
    participations[index] = value;
    setParticipActivInput(index);

    if (participations.every(part => part !== '')) {
      setParticipations([...participations, '']);

      return;
    }

    if (value === '') {
      setParticipations([...participations.filter(part => part), '']);

      return;
    }

    setParticipActivInput(index);
    setParticipations([...participations]);
  };

  const toggleButton = () => {
    setIsOpen(!isOpen);
  };

  const getYouTubeVideoCode = () => {
    if (!youtubeUrl) {
      return '';
    }

    const rowUrlParts = youtubeUrl.split('/');
    const rowUrlPart = rowUrlParts[rowUrlParts.length - 1];

    if (!rowUrlPart.includes('?v=')) {
      return rowUrlPart;
    }

    const urlCode = rowUrlPart.substring(
      rowUrlPart.indexOf('?v=') + 1,
      rowUrlPart.indexOf('&'),
    );

    if (urlCode) {
      return urlCode;
    }

    return '';
  };

  const addVideo = async() => {
    const uploadedImageUrl = await uploadImageFile();

    const videoData = {
      name,
      location,
      url: getYouTubeVideoCode(),
      soundCloudUrl,
      videoImg: uploadedImageUrl,
      videoImgAlign: '',
      videoExternalImg: uploadedImageUrl ? '' : imageUrl,
      slug,
      participants: participations.filter(part => part),
      order: getAvailableOrder(videos),
    };

    if (slug) {
      videoData.listOrder = getListOrder(videos, slug);
    }

    try {
      await addDoc(collection(db, 'videos'), videoData);
      setName('');
      setLocation('');
      setYoutubeUrl('');
      setSoundCloudUrl('');
      setImageUrl('');
      setImageBlobFile(null);
      setSlug('');
      setParticipations(['']);
      setParticipActivInput(null);
      setIsOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Coudn\'t add new video. Error: ', error);
    }
  };

  const uploadImageFile = async() => {
    if (!imageBlobFile) {
      return '';
    }

    let freeMaxId = 1;
    let url = '';

    if (videoPreviews.length) {
      const imageNamesIdes = videoPreviews.map(previewName => parseInt(previewName.name.split('-')[0], 10));
      const filteredImageNamesIdes = imageNamesIdes.filter(id => id);

      if (filteredImageNamesIdes.length) {
        freeMaxId = Math.max(...filteredImageNamesIdes) + 1;
      }
    }

    const storageRef = ref(storage, `/video-previews/${freeMaxId}-${imageBlobFile.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, imageBlobFile);

      url = await getDownloadURL(snapshot.ref);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Coudn/t upload image file');
    }

    return url;
  };

  return (
    <div className="AdminAddVideoForm">
      <div className="AdminAddVideoForm__buttons">
        <button
          type="button"
          className="AdminAddVideoForm__open-btn"
          onClick={toggleButton}
        >
          {isOpen ? 'close' : 'add new video'}
        </button>
        {(isOpen
          && name
          && (
            (youtubeUrl && !soundCloudUrl)
          || (soundCloudUrl && !youtubeUrl && imageUrl))
        ) && (
          <button
            type="submit"
            className="AdminAddVideoForm__save-btn"
            onClick={addVideo}
          >
            save
          </button>
        )}
      </div>
      {isOpen && (
        <form className="AdminAddVideoForm__form">
          <div
            className="AdminAddVideoForm__photo-frame"
            style={{
              backgroundImage: imageUrl
                ? `url(${imageUrl})`
                : `url('http://img.youtube.com/vi/${getYouTubeVideoCode(youtubeUrl)}/sddefault.jpg')`,
            }}
          />
          <div className="AdminAddVideoForm__inputs">
            <input
              type="text"
              className="AdminAddVideoForm__input"
              placeholder="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <input
              type="text"
              className="AdminAddVideoForm__input"
              placeholder="Location"
              value={location}
              onChange={({ target }) => setLocation(target.value)}
            />
            <input
              type="text"
              className="AdminAddVideoForm__input"
              placeholder="Youtube url"
              value={youtubeUrl}
              onChange={({ target }) => setYoutubeUrl(target.value)}
            />
            <input
              type="text"
              className="AdminAddVideoForm__input"
              placeholder="SoundCloud url"
              value={soundCloudUrl}
              onChange={({ target }) => setSoundCloudUrl(target.value)}
            />
            <div className="AdminAddVideoForm__input-container">
              <input
                type="text"
                className="AdminAddVideoForm__input AdminAddVideoForm__input--file"
                placeholder="Image Url"
                value={imageUrl}
                onChange={({ target }) => setImageUrl(target.value)}
              />
              <label htmlFor="imageFile" className="AdminAddVideoForm__input-file-label">
                Choose Image
                <input
                  type="file"
                  name="image-file"
                  id="imageFile"
                  className="AdminAddVideoForm__input-file"
                  onChange={({ target }) => setImageFile(target)}
                />
              </label>
            </div>
            <input
              type="text"
              className="AdminAddVideoForm__input"
              placeholder="Video List Slug"
              value={slug}
              onChange={({ target }) => setSlug(target.value)}
            />
            {participations.map((participation, index) => (
              <AdminAddVideoFormParticipationInput
                value={participation}
                setValue={setParticipationValue}
                key={`${participation}-${index + 1}`}
                id={index}
                isActive={participActivInput === index}
              />
            ))}
          </div>
        </form>
      )}
    </div>
  );
};

AdminAddVideoForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  db: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storage: PropTypes.object.isRequired,
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
  videoPreviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

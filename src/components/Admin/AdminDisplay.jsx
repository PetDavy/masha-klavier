/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytes, getDownloadURL } from 'firebase/storage';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AdminParticipantInputs } from './AdminParticipantInputs';
import { backgroundImg } from '../../utils/setImgBackground';
import { getListOrder } from '../../utils/orderUtils';
import './AdminDisplay.scss';

export const AdminDisplay = ({ videos, video, db, storage, videoPreviews }) => {
  const [name, setName] = useState(video.name);
  const [location, setLocation] = useState(video.location);
  const [slug, setSlug] = useState(video.slug ? video.slug : '');
  const [participants, setParticipants] = useState(video.participants);
  const [externalImage, setExternalImage] = useState(video.videoExternalImg);
  const [imageUrl, setImageUrl] = useState(video.videoImg);
  const [imageBlobFile, setImageBlobFile] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const [onChange, setOnChange] = useState(false);
  const [isOpenImageForm, setIsOpenImageForm] = useState(false);
  const [background, setBackground] = useState(backgroundImg(video));
  // const background = backgroundImg(video);

  const windowURL = window.URL || window.webkitURL;

  useEffect(() => {
    setName(video.name);
    setLocation(video.location);
    setSlug(video.slug ? video.slug : '');
    setParticipants(video.participants);
    setImageUrl(video.videoImg);
    setExternalImage(video.videoExternalImg);
    setBackground(backgroundImg(video));
    setOnChange(false);
    setUpdateData({
      name: video.name,
      location: video.location,
      participants: video.participants,
      slug: video.slug,
      videoImg: video.videoImg,
      videoExternalImg: video.videoExternalImg,
      background: backgroundImg(video),
    });
  }, [video]);

  useEffect(() => {
    if (updateData.name !== video.name
      || updateData.location !== video.location
      || updateData.slug !== video.slug
      || checkParticipantsUpdate()
      || updateData.videoExternalImg !== video.videoExternalImg
      || updateData.background.backgroundImage !== background.backgroundImage
    ) {
      setOnChange(true);
    } else {
      setOnChange(false);
    }
  }, [updateData]);

  const checkParticipantsUpdate = () => (
    updateData.participants.length !== video.participants.length
      || updateData.participants.some((par, i) => par !== video.participants[i])
  );

  const handleNameChange = ({ target }) => {
    setName(target.value);

    setUpdateData({
      ...updateData,
      name: target.value,
    });
  };

  const handleLocationChange = ({ target }) => {
    setLocation(target.value);

    setUpdateData({
      ...updateData,
      location: target.value,
    });
  };

  const handleSlugChange = ({ target }) => {
    setSlug(target.value);

    if (target.value !== video.slug) {
      updateData.listOrder = getListOrder(videos, target.value);
    }

    setUpdateData({
      ...updateData,
      slug: target.value,
    });
  };

  const handleExternalImageChange = ({ target }) => {
    setExternalImage(target.value);

    if (!updateData.videoImg && target.value) {
      setUpdateData({
        ...updateData,
        videoExternalImg: target.value,
        background: backgroundImg({
          videoExternalImg: target.value,
        }),
      });
    } else if (updateData.videoImg) {
      setUpdateData({
        ...updateData,
        videoExternalImg: target.value,
      });
    } else {
      setUpdateData({
        ...updateData,
        videoExternalImg: target.value,
        background: backgroundImg({
          url: video.url,
        }),
      });
    }
  };

  const handleVidelImgDelete = () => {
    if (imageUrl && imageBlobFile) {
      setImageBlobFile(null);
      setUpdateData({
        ...updateData,
        videoImg: video.videoImg,
        background: backgroundImg(video),
      });
    } else if (imageUrl && updateData.videoExternalImg) {
      setUpdateData({
        ...updateData,
        videoImg: null,
        background: backgroundImg({
          videoExternalImg: updateData.videoExternalImg,
        }),
      });
    } else if (imageUrl) {
      setUpdateData({
        ...updateData,
        videoImg: null,
        background: backgroundImg({
          url: video.url,
        }),
      });
    } else if (!imageUrl && updateData.videoExternalImg) {
      setImageBlobFile(null);
      setUpdateData({
        ...updateData,
        videoImg: null,
        background: backgroundImg({
          videoExternalImg: updateData.videoExternalImg,
        }),
      });
    } else {
      setImageBlobFile(null);
      setUpdateData({
        ...updateData,
        videoImg: null,
        background: backgroundImg({
          url: video.url,
        }),
      });
    }
  };

  const addParticipant = () => {
    const updatedParticipants = [
      ...updateData.participants,
      '',
    ];

    setUpdateData({
      ...updateData,
      participants: updatedParticipants,
    });

    setParticipants([
      ...participants,
      '',
    ]);
  };

  const deleteParticipation = (index) => {
    const updatedParticipants = [
      ...updateData.participants.slice(0, index),
      ...updateData.participants.slice(index + 1, updateData.participants.length),
    ];

    setUpdateData({
      ...updateData,
      participants: updatedParticipants,
    });

    setParticipants([...updatedParticipants]);
  };

  const setImageFile = (target) => {
    const imageFile = target.files[0];

    if (!imageFile.type.startsWith('image')) {
      // eslint-disable-next-line no-alert
      alert(`файл ${imageFile.name} не є зображенням або файлом потрібного формату`);

      return;
    }

    setUpdateData({
      ...updateData,
      background: backgroundImg({
        videoImg: windowURL.createObjectURL(imageFile),
      }),
    });

    setImageBlobFile(imageFile);

    // eslint-disable-next-line no-console
    console.log(imageFile);
  };

  const saveChanges = async() => {
    try {
      const videoRef = doc(db, 'videos', video.id);
      const updateDataForSave = { ...updateData };

      delete updateDataForSave.background;

      if (imageBlobFile) {
        const imageFileUrl = await uploadImage();

        updateDataForSave.videoImg = imageFileUrl;
      } else if (!updateData.videoImg) {
        deleteImage();
      }

      await setDoc(videoRef, {
        ...video,
        ...updateDataForSave,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Couldn\'t update data: ', error);
    }
  };

  const uploadImage = async() => {
    deleteImage();

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

  const deleteImage = async() => {
    if (!video.videoImg) {
      return;
    }

    const imageToDelete = videoPreviews.find(preview => preview.url === video.videoImg);

    if (imageToDelete) {
      const desertRef = ref(storage, `video-previews/${imageToDelete.name}`);

      await deleteObject(desertRef);
    }
  };

  return (
    <div className="AdminDisplay">
      <div
        className={classNames('AdminDisplay__video-frame', {
          'AdminDisplay__video-frame--onchange': onChange,
        })}
        style={updateData.background}
      >
        <span
          className="AdminDisplay__video-tools"
          role="button"
          aria-hidden="true"
          onClick={() => setIsOpenImageForm(!isOpenImageForm)}
        >
          <i className="fas fa-pencil-alt" />
        </span>
      </div>
      <button
        type="button"
        className={classNames('AdminDisplay__save-btn', {
          'AdminDisplay__save-btn--visible': onChange,
        })}
        onClick={saveChanges}
      >
        Save Changes
      </button>
      {/* IMAGE INFORMATION */}
      {isOpenImageForm && (
        <div className="AdminDisplay__image-inputs">
          <label htmlFor="imageFile" className="AdminDisplay__input-file-label">
            Choose Image
            <input
              type="file"
              name="image-file"
              id="imageFile"
              className="AdminDisplay__input-file"
              onChange={({ target }) => setImageFile(target)}
            />
            <i
              className={classNames('AdminDisplay__image-icon fas', {
                'fa-check': video.videoImg,
                'fa-times': !video.videoImg,
              })}
            />
          </label>
          {(video.videoImg || imageBlobFile) && (
            <button
              type="button"
              className="AdminDisplay__image-delete"
              onClick={handleVidelImgDelete}
            >
              Delete Image
            </button>
          )}
          <label
            className="AdminDisplay__input-label"
            htmlFor="external-image"
          >
            External image:
          </label>
          <input
            type="text"
            className="AdminDisplay__input"
            id="external-image"
            value={externalImage}
            onChange={handleExternalImageChange}
          />
        </div>
      )}

      {/* GENERAL INFORMATION */}
      <label
        className="AdminDisplay__input-label"
        htmlFor="video-name"
      >
        Name:
      </label>
      <input
        type="text"
        className="AdminDisplay__input"
        id="video-name"
        value={name}
        onChange={handleNameChange}
      />
      <label
        className="AdminDisplay__input-label"
        htmlFor="video-location"
      >
        Location:
      </label>
      <input
        type="text"
        className="AdminDisplay__input"
        id="video-location"
        value={location}
        onChange={handleLocationChange}
      />
      <label
        className="AdminDisplay__input-label"
        htmlFor="video-slug"
      >
        List Slug:
      </label>
      <input
        type="text"
        className="AdminDisplay__input"
        id="video-slug"
        value={slug}
        onChange={handleSlugChange}
      />
      <div className="AdminDisplay__input-label">
        Participants:
        <button
          type="button"
          className="AdminDisplay__participants-add-btn"
          onClick={addParticipant}
        >
          add
        </button>
      </div>
      <AdminParticipantInputs
        participants={participants.map(par => ({
          id: video.name,
          value: par,
        }))}
        updateData={updateData}
        setUpdateData={setUpdateData}
        deleteParticipation={deleteParticipation}
      />
    </div>
  );
};

AdminDisplay.propTypes = {
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
  video: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    soundCloudUrl: PropTypes.string,
    videoExternalImg: PropTypes.string,
    project: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    preview: PropTypes.string,
    slug: PropTypes.string,
    videoImg: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  db: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storage: PropTypes.object.isRequired,
  videoPreviews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
};

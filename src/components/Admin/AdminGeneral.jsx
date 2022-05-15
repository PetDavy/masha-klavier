/* eslint-disable max-len */
import React from 'react';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import PropTypes from 'prop-types';
import './AdminGeneral.scss';

export const AdminGeneral = ({ images, storage, updateImages }) => {
  const setImageFile = async(target) => {
    const imageBlobFile = target.files[0];

    if (!imageBlobFile || !imageBlobFile.type.startsWith('image')) {
      // eslint-disable-next-line no-alert
      alert(`файл ${imageBlobFile.name} не є зображенням або файлом потрібного формату`);

      return;
    }

    let freeMaxId = 1;

    if (images.length) {
      const imageNamesIdes = images.map(image => parseInt(image.name.split('-')[1], 10));
      const filteredImageNamesIdes = imageNamesIdes.filter(id => id);

      if (filteredImageNamesIdes.length) {
        freeMaxId = Math.max(...filteredImageNamesIdes) + 1;
      }
    }

    const storageRef = ref(storage, `/images/showcase-${freeMaxId}`);

    try {
      await uploadBytes(storageRef, imageBlobFile);
      updateImages();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Coudn/t upload image file');
    }
  };

  const deleteImage = async(imageName) => {
    const desertRef = ref(storage, `images/${imageName}`);

    try {
      await deleteObject(desertRef);
      updateImages();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Coudn/t selete file');
    }
  };

  return (
    <div className="AdminGeneral__content">
      <div className="AdminGeneral__showcase-block AdminGeneral__content-block">
        <h2 className="AdminGeneral__block-title">Showcase Images</h2>
        <div className="AdminGeneral__showcase-list">
          {images.map(image => (
            <div className="AdminGeneral__showcase-item" key={image.name}>
              <img
                src={image.url}
                alt={image.name}
                height="180"
                width="300"
                className="AdminGeneral__showcase-image"
              />
              <div
                className="AdminGeneral__showcase-del-btn"
                role="button"
                aria-hidden="true"
                onClick={() => deleteImage(image.name)}
              >
                delete
              </div>
            </div>
          ))}
          {images.length < 4 && (
            <label htmlFor="showcase-image-file" className="AdminGeneral__showcase-item">
              <div className="AdminGeneral__showcase-add-btn">
                <input
                  type="file"
                  id="showcase-image-file"
                  className="AdminGeneral__showcase-file-input"
                  onChange={({ target }) => setImageFile(target)}
                />
                <span className="AdminGeneral__showcase-add-btn-text">new</span>
              </div>
            </label>
          )}
        </div>
      </div>

      <div className="AdminGeneral__about-block">
        <h2 className="AdminGeneral__block-title">About Image</h2>
      </div>
    </div>
  );
};

AdminGeneral.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  })).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  storage: PropTypes.object.isRequired,
  updateImages: PropTypes.func.isRequired,
};

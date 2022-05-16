/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import PropTypes from 'prop-types';
import './AdminGeneral.scss';

export const AdminGeneral = ({ images, storage, updateImages, resume }) => {
  const [showcaseImages, setShowcaseImages] = useState([]);
  const [aboutImage, setAboutImage] = useState(null);
  const [resumeCV, setResumeCV] = useState(null);

  useEffect(() => {
    setShowcaseImages(images.filter(image => image.name.startsWith('showcase')));
    setAboutImage(images.find(image => image.name.startsWith('about')));
  }, [images]);

  useEffect(() => {
    setResumeCV(resume);
  }, [resume]);

  const setShowcaseImageFile = async(target) => {
    const imageBlobFile = target.files[0];

    if (!imageBlobFile || !imageBlobFile.type.startsWith('image')) {
      // eslint-disable-next-line no-alert
      alert(`файл ${imageBlobFile.name} не є зображенням або файлом потрібного формату`);

      return;
    }

    let freeMaxId = 1;

    if (showcaseImages.length) {
      const imageNamesIdes = showcaseImages.map(image => parseInt(image.name.split('-')[1], 10));
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

  const setAboutImageFile = async(target) => {
    const imageBlobFile = target.files[0];

    if (!imageBlobFile || !imageBlobFile.type.startsWith('image')) {
      // eslint-disable-next-line no-alert
      alert(`файл ${imageBlobFile.name} не є зображенням або файлом потрібного формату`);

      return;
    }

    const storageRef = ref(storage, '/images/about-img.jpg');

    try {
      await uploadBytes(storageRef, imageBlobFile);
      updateImages();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Coudn/t upload image file');
    }
  };

  const setResumeFile = async(target) => {
    const resumeBlobFile = target.files[0];

    if (!resumeBlobFile || !resumeBlobFile.type.startsWith('application')) {
      // eslint-disable-next-line no-alert
      alert(`файл ${resumeBlobFile.name} не є файлом потрібного формату`);

      return;
    }

    const storageRef = ref(storage, 'resume/resume.pdf');

    try {
      await uploadBytes(storageRef, resumeBlobFile);
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
          {showcaseImages.map(image => (
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
          {showcaseImages.length < 4 && (
            <label htmlFor="showcase-image-file" className="AdminGeneral__showcase-item">
              <div className="AdminGeneral__showcase-add-btn">
                <input
                  type="file"
                  id="showcase-image-file"
                  className="AdminGeneral__showcase-file-input"
                  onChange={({ target }) => setShowcaseImageFile(target)}
                />
                <span className="AdminGeneral__showcase-add-btn-text">new</span>
              </div>
            </label>
          )}
        </div>
      </div>

      {aboutImage && (
        <div className="AdminGeneral__about-block AdminGeneral__content-block">
          <h2 className="AdminGeneral__block-title">About Image</h2>
          <div className="AdminGeneral__about-image-container">
            <img
              src={aboutImage?.url}
              alt={aboutImage?.name}
              className="AdminGeneral__about-image"
            />
            <label htmlFor="about-image-file" className="AdminGeneral__about-change-btn">
              <input
                type="file"
                id="about-image-file"
                className="AdminGeneral__about-file-input"
                onChange={({ target }) => setAboutImageFile(target)}
              />
              <span className="AdminGeneral__about-add-btn-text">change</span>
            </label>
          </div>
        </div>
      )}

      <div className="AdminGeneral__resume-block AdminGeneral__content-block">
        <h2 className="AdminGeneral__block-title">Resume</h2>
        <a
          href={resumeCV?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="AdminGeneral__resume-btn AdminGeneral__resume-btn--watch"
        >
          watch CV
        </a>
        <label htmlFor="resume-file" className="AdminGeneral__resume-btn">
          <input
            type="file"
            id="resume-file"
            className="AdminGeneral__about-file-input"
            onChange={({ target }) => setResumeFile(target)}
          />
          <span className="AdminGeneral__about-add-btn-text">change</span>
        </label>
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
  resume: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

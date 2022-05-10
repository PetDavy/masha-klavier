/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from 'firebase/firestore';
import { Home } from './components/Home';
import { About } from './components/About';
import { Navigation } from './components/Navigation';
import { Portfolio } from './components/Portfolio';
import { Contacts } from './components/Contacts';
import { Admin } from './components/Admin';
import './App.scss';

export const App = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [activePath, setActivePath] = useState('');
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [auth] = useState(getAuth());
  const [db] = useState(getFirestore());
  const [storage] = useState(getStorage());
  const [videos, setVideos] = useState([]);
  const [images, setImages] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogedIn(true);
      } else {
        setIsLogedIn(false);
      }
    });

    updateVideos();
  }, []);

  const updatePreviews = async() => {
    const photosRef = ref(storage, '/video-previews/');

    try {
      const res = await listAll(photosRef);

      const resList = res.items.map(itemRef => (
        getDownloadURL(itemRef)
          .then(url => ({
            name: itemRef.name,
            url,
          }))
      ));

      Promise.all(resList)
        .then(previews => setVideoPreviews(previews));
    } catch (error) {
      console.log(error);
    }
  };

  const updateImages = async() => {
    const imagesRef = ref(storage, '/images/');

    try {
      const res = await listAll(imagesRef);

      const resList = res.items.map(itemRef => (
        getDownloadURL(itemRef)
          .then(url => ({
            name: itemRef.name,
            url,
          }))
      ));

      Promise.all(resList)
        .then(loadedImages => setImages(loadedImages));
    } catch (error) {
      console.log(error);
    }
  };

  const updateVideos = () => {
    const q = query(collection(db, 'videos'));

    onSnapshot(q, (querySnapshot) => {
      const videoList = [];

      querySnapshot.forEach((doc) => {
        videoList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setVideos(videoList);
      updatePreviews();
      updateImages();
    });
  };

  const hideMenu = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className="App">
      <Route path="*">
        <Navigation
          isOpen={isOpenMenu}
          setIsOpen={setIsOpenMenu}
          activeItem={activeItem}
          isLogedIn={isLogedIn}
          setActiveItem={setActiveItem}
          path={useHistory().location.pathname}
          activePath={activePath}
          setActivePath={setActivePath}
        />
        <Home
          setActiveItem={setActiveItem}
          isActive={activePath === ''}
          images={images}
          hideMenu={hideMenu}
        />
        <About
          isActive={activePath === 'about'}
          hideMenu={hideMenu}
          activePath={activePath}
        />
        <Portfolio
          isActive={activePath === 'portfolio'}
          hideMenu={hideMenu}
          activePath={activePath}
          videos={videos}
        />
        <Contacts
          isActive={activePath === 'contacts'}
          hideMenu={hideMenu}
          activePath={activePath}
        />
        <Admin
          isActive={activePath === 'admin'}
          hideMenu={hideMenu}
          auth={auth}
          db={db}
          storage={storage}
          isLogedIn={isLogedIn}
          activePath={activePath}
          videos={videos}
          videoPreviews={videoPreviews}
        />
      </Route>
    </div>
  );
};

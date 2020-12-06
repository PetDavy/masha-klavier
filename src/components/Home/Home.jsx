import React from 'react';
import { TypingText } from './TypingText';
import './Home.scss';

export const Home = () => (
  <section className="Home">
    <div className="Home__text">
      <h3 className="Home__text--small">hi there !</h3>
      <h1 className="Home__text--large">
        {`i'm a `}
        <TypingText />
      </h1>
      <p className="Home__paragraph">
        I&apos;m a Freelance UI/UX Designer and Developer based in
        London, England. I strives to build immersive and beautiful web
        applications through carefully crafted code and user-centric design.
      </p>

      <div className="Home__buttons">
        <button
          type="button"
          className="btn Home__btn-about"
        >
          <i className="fas fa-user" />
          <span>more about me</span>
        </button>
        <button
          type="button"
          className="btn Home__btn-portfolio"
        >
          <i className="fas fa-suitcase" />
          <span>portfolio</span>
        </button>
      </div>
    </div>
  </section>
);

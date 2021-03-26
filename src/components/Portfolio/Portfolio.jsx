import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Portfolio.scss';
import data from '../../data.json';

export const Portfolio = ({ isActive, hideMenu }) => {
  const youtubePrefix = 'http://img.youtube.com/vi/';
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsShown(true);
    } else {
      setTimeout(() => setIsShown(false), 1000);
    }
  }, [isActive]);

  return (
    <section
      className={classNames('Portfolio', { active: isShown })}
      style={{ zIndex: isActive ? '2' : '1' }}
      onClick={hideMenu}
      role="button"
      aria-hidden="true"
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
        {data.videos.map(video => (
          <div
            className="Portfolio__video"
            key={video.name}
            style={{
              backgroundImage:
              `url('${youtubePrefix}${video.url}/sddefault.jpg')`,
            }}
          >
            <div className="Portfolio__video-name">{video.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

Portfolio.propTypes = {
  isActive: PropTypes.bool.isRequired,
  hideMenu: PropTypes.func.isRequired,
};

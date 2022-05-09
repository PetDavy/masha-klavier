import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmModal.scss';

export const ConfirmModal = ({ executeFunc, funcParam, setDeletVideo }) => {
  const handleConfirm = () => {
    executeFunc(funcParam);
    setDeletVideo(null);
  };

  const handleCancel = () => {
    setDeletVideo(null);
  };

  return (
    <div className="ConfirmModal">
      <div className="ConfirmModal__overlay" />
      <div className="ConfirmModal__window">
        <div className="ConfirmModal__quastion">
          Do you want to delete this video?
        </div>
        <div className="ConfirmModal__buttons">
          <button
            type="button"
            className="ConfirmModal__confirm-btn"
            onClick={handleConfirm}
          >
            delete
          </button>
          <button
            type="button"
            className="ConfirmModal__cancel-btn"
            onClick={handleCancel}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  executeFunc: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  funcParam: PropTypes.any.isRequired,
  setDeletVideo: PropTypes.func.isRequired,
};

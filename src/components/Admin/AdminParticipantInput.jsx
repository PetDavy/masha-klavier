/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
export const AdminParticipantInput = ({ value, index, id, updateData, setUpdateData, deleteParticipation }) => {
  const [participantData, setParticipantsData] = useState('');

  useEffect(() => {
    setParticipantsData(value);
  }, [value, id]);

  const handleParticipantChange = ({ target }) => {
    setParticipantsData(target.value);
    const updatedParticipants = [...updateData.participants];

    updatedParticipants[index] = target.value;

    setUpdateData({
      ...updateData,
      participants: updatedParticipants,
    });
  };

  return (
    <div className="AdminDisplay__input-wrapper">
      <input
        type="text"
        className="AdminDisplay__input"
        value={participantData}
        onChange={handleParticipantChange}
      />
      <button
        type="button"
        className="AdminDisplay__participant-del-btn"
        onClick={() => deleteParticipation(index)}
      >
        ―
      </button>
    </div>
  );
};

AdminParticipantInput.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  updateData: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setUpdateData: PropTypes.func.isRequired,
  deleteParticipation: PropTypes.func.isRequired,
};

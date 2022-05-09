import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AdminParticipantInput } from './AdminParticipantInput';

// eslint-disable-next-line max-len
export const AdminParticipantInputs = ({ participants, updateData, setUpdateData, deleteParticipation }) => {
  const [participantsList, setParticipantsList] = useState(participants);

  useEffect(() => {
    setParticipantsList(participants);
  }, [participants]);

  return (
    <div className="AdminDisplay__participants-list">
      {participantsList.map((participant, index) => (
        <AdminParticipantInput
          value={participant.value}
          index={index}
          id={`${index}-${participant.id}-${participant.value}`}
          key={`${participant.id}-${participant.value}`}
          updateData={updateData}
          setUpdateData={setUpdateData}
          deleteParticipation={deleteParticipation}
        />
      ))}
    </div>
  );
};

AdminParticipantInputs.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  setUpdateData: PropTypes.func.isRequired,
  updateData: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  deleteParticipation: PropTypes.func.isRequired,
};

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
export const AdminAddVideoFormParticipationInput = ({ value, setValue, id, isActive }) => {
  const [inputValue, setInputValue] = useState(value);
  const inputElement = useRef(null);

  useEffect(() => {
    if (isActive) {
      inputElement.current.focus();
    }
  }, []);

  const handleChange = ({ target }) => {
    setValue(target.value, id);
    setInputValue(target.value);
  };

  return (
    <input
      type="text"
      className="AdminAddVideoForm__input"
      value={inputValue}
      ref={inputElement}
      placeholder={`Participant ${id + 1}`}
      onChange={handleChange}
    />
  );
};

AdminAddVideoFormParticipationInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

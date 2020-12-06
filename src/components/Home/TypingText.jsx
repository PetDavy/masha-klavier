import React, { useState, useEffect } from 'react';

const words = ['Pianist', 'Сoncertmaster', 'Musician'];
const initTypeSpeed = 250;

export const TypingText = () => {
  const [index, setIndex] = useState(0);
  const [typeSpeed, setTypeSpeed] = useState(initTypeSpeed);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingTrigger, setTypingTrigger] = useState(true);

  const changeText = () => {
    const fullWord = words[index % words.length];

    if (isDeleting && currentText) {
      setCurrentText(fullWord.slice(0, currentText.length - 1));
      setTypeSpeed(initTypeSpeed / 2);
    } else if (!isDeleting && currentText !== fullWord) {
      setCurrentText(fullWord.slice(0, currentText.length + 1));
      setTypeSpeed(initTypeSpeed);
    }

    if (!isDeleting && currentText === fullWord) {
      setTypeSpeed(1500);
      setIsDeleting(true);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setIndex(index + 1);
      setTypeSpeed(initTypeSpeed);
    }

    setTypingTrigger(!typingTrigger);
  };

  useEffect(() => {
    setTimeout(changeText, typeSpeed);
  }, [typingTrigger]);

  return (
    <span className="TypingText">
      {currentText}
    </span>
  );
};

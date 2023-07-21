import React, { useState, useEffect } from 'react';
import './TypewriterAnimation.css'; // Add the CSS file for styling

const TypewriterAnimation = ({ text="", minSpeed = 10, maxSpeed = 50 }:any) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, getRandomSpeed());
      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex, text]);

  const getRandomSpeed = () => {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed);
  };

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">{currentText}</span>
    </div>
  );
};

export default TypewriterAnimation;

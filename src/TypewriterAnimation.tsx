import React, { useState, useEffect } from "react"
import "./TypewriterAnimation.css" // Add the CSS file for styling

interface AnimationProps {
  text: string
  setScroll: React.Dispatch<React.SetStateAction<boolean>>
  setVideoPlay: React.Dispatch<React.SetStateAction<boolean>>
  minSpeed?: number
  maxSpeed?: number
}

const TypewriterAnimation = ({
  text = "",
  setScroll,
  setVideoPlay,
  minSpeed = 10,
  maxSpeed = 50,
}: AnimationProps) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      setVideoPlay(true)
      const typingTimer = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
        setScroll(true)
      }, getRandomSpeed())
      return () => {
        clearTimeout(typingTimer)
        setScroll(false)
        setVideoPlay(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, text])

  const getRandomSpeed = () => {
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed)
  }

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">{currentText}</span>
    </div>
  )
}

export default TypewriterAnimation

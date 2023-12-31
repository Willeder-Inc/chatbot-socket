import React, { useState, useEffect } from "react"
import "./TypewriterAnimation.css" // Add the CSS file for styling

interface AnimationProps {
  text: string
  setScroll?: React.Dispatch<React.SetStateAction<boolean>>
  setVideoPlay?: React.Dispatch<React.SetStateAction<boolean>>
  videoId: string
  minSpeed?: number
  maxSpeed?: number
}

const TypewriterAnimation = ({
  text = "",
  setScroll,
  setVideoPlay,
  minSpeed = 10,
  maxSpeed = 50,
  videoId,
}: AnimationProps) => {
  const [currentText, setCurrentText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [vidPlay, setvidPlay] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      setvidPlay(true)
      const typingTimer = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
        // setScroll(true)
      }, getRandomSpeed())
      return () => {
        clearTimeout(typingTimer)
        // setScroll(false)
        setvidPlay(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, text])

  useEffect(() => {
    let vid = document.getElementById(videoId) as HTMLVideoElement
    // vidPlay ? vid.play() : vid.pause()
    if (vidPlay) {
      vid.play()
    } else {
      vid.pause()
      vid.currentTime = 0
    }
    if (text.length < 30) {
      vid.play()
      setTimeout(function () {
        vid.pause()
      }, 3 * 1000)
      vid.currentTime = 0
    }
  }, [vidPlay, videoId,text])

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

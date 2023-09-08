import React, { useState } from "react"
import "./App.css"
import Iphone from "./components/Iphone/Iphone"
import Chat from "./Chat"
import "./Header.css"
import Header from "./Header"
import manVideo from "./assests/man.mp4"
import manVideoLine from "./assests/man_line.mp4"

import womanVideo from "./assests/woman.mp4"
import womanVideoLine from "./assests/woman_line.mp4"

import morikoshiVideo from "./assests/morikoshi.mp4"
import morikoshiVideoLine from "./assests/morikoshi_line.mp4"

const ChatApp = () => {
  const [theme, setTheme] = useState("twitter")
  const [character, setCharacter] = useState("boy")
  const getAvator = (type: string) => {
    switch (type) {
      case "man":
        return manVideo
      case "woman":
        return womanVideo
      case "morikoshi":
        return morikoshiVideo
      default:
        return manVideo
    }
  }
  const getAvatorLine = (type: string) => {
    switch (type) {
      case "man":
        return manVideoLine
      case "woman":
        return womanVideoLine
      case "morikoshi":
        return morikoshiVideoLine
      default:
        return manVideoLine
    }
  }
  return (
    <div className="App">
      <Header theme={theme} setTheme={setTheme} setCharacter={setCharacter} />
      <Iphone>
        <Chat
          theme={theme}
          setTheme={setTheme}
          character={character}
          setCharacter={setCharacter}
        />
      </Iphone>
      {theme !== "line" ? (
        <video
          width="100%"
          height="100%"
          muted
          // autoPlay
          id="vidbg"
          playsInline
          key={getAvator(character)}
          loop={true}
        >
          <source src={getAvator(character)} type="video/mp4"></source>
        </video>
      ) : (
        <video
          width="100%"
          height="100%"
          muted
          // autoPlay
          id="vidbg"
          playsInline
          key={getAvatorLine(character)}
          loop={true}
        >
          <source src={getAvatorLine(character)} type="video/mp4"></source>
        </video>
      )}
    </div>
  )
}

export default ChatApp

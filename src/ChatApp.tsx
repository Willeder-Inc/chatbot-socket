import React, { useState } from "react"
import "./App.css"
import Iphone from "./components/Iphone/Iphone"
import Chat from "./Chat"
import "./Header.css"
import Header from "./Header"

const ChatApp = () => {
  const [theme, setTheme] = useState("twitter")
  const [character, setCharacter] = useState("boy")
  return (
    <>
      <Header theme={theme} setTheme={setTheme} setCharacter={setCharacter} />
      <Iphone>
        <Chat
          theme={theme}
          setTheme={setTheme}
          character={character}
          setCharacter={setCharacter}
        />
      </Iphone>
    </>
  )
}

export default ChatApp

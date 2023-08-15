import React, { useState } from "react"
import "./App.css"
import Iphone from "./components/Iphone/Iphone"
import Chat from "./Chat"
import './Header.css'
import Header from "./Header"

function App() {
  const [theme, setTheme] = useState("twitter")
  const [character, setCharacter] = useState("boy")
  return (
    <div className="App">
      {/* <Header theme={theme} setTheme={setTheme} setCharacter={setCharacter} />
      <Chat theme={theme} character={character} /> */}
      <Header theme={theme} setTheme={setTheme} setCharacter={setCharacter} />
      {/* <div style={{ color: "#000", flex: 1 }}>test</div> */}
      <Iphone>
        <Chat theme={theme} setTheme={setTheme} character={character} setCharacter={setCharacter}/>
      </Iphone>
    </div>
  )
}

export default App

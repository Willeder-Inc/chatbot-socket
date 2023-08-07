import React, { useState } from "react"
import "./App.css"
import Chat from "./Chat"
import Header from "./Header"

function App() {
  const [theme, setTheme] = useState("")
  const [character, setCharacter] = useState("boy")
  return (
    <div className="App">
      <Header theme={theme} setTheme={setTheme} setCharacter={setCharacter} />
      <Chat theme={theme} character={character} />
    </div>
  )
}

export default App

import React from "react"
import "./Header.css"
import CustomSelect from "./CustomSelect"
import boyIcon from "./assests/icons/boy.png"
import girlIcon from "./assests/icons/girl.png"
import { ReactComponent as TwitterLogo } from "./assests/icons/twitter.svg"
import { ReactComponent as LineLogo } from "./assests/icons/line.svg"
import { ReactComponent as MessengerLogo } from "./assests/icons/messenger.svg"
import { ReactComponent as InstagramLogo } from "./assests/icons/ig.svg"
interface HeaderProps {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
  setCharacter: React.Dispatch<React.SetStateAction<string>>
}

type Option = {
  label: React.ReactNode
  value: string
} | null

const Header = ({ theme, setTheme, setCharacter }: HeaderProps) => {
  const themes = [
    {
      label: (
        <div className="logo">
          <TwitterLogo />
        </div>
      ),
      value: "twitter",
    },
    {
      label: (
        <div className="logo">
          <LineLogo />
        </div>
      ),
      value: "line",
    },
    {
      label: (
        <div className="logo">
          <MessengerLogo />
        </div>
      ),
      value: "messenger",
    },
    {
      label: (
        <div className="logo">
          <InstagramLogo />
        </div>
      ),
      value: "instagram",
    },
  ]

  const character = [
    {
      label: <img src={boyIcon} alt="boy" className="characterIcon" />,
      value: "boy",
    },
    {
      label: <img src={girlIcon} alt="boy" className="characterIcon" />,
      value: "girl",
    },
  ]
  const handleSelectChange = (selectedOption: Option) => {
    console.log("Selected option:", selectedOption)
    setTheme(selectedOption?.value as string)
    // You can handle the selected option here or pass it to the parent component
  }
  const handleCharacterChange = (selectedOption: Option) => {
    console.log("Selected option:", selectedOption)
    setCharacter(selectedOption?.value as string)
    // You can handle the selected option here or pass it to the parent component
  }
  return (
    <header className={`headerT`}>
      {/* <h3>Senjyu Chatbot</h3> */}
      {/* <select
        id="theme"
        onChange={(e) => setTheme(e.target.value)}
        defaultValue={"twitter"}
      >
        <option value="twitter">twitter</option>
        <option value="instagram">instagram</option>
      </select> */}
      {/* <select
        id="avatar"
        onChange={(e) => setCharacter(e.target.value)}
        defaultValue={"boy"}
      >
        <option value="boy">
          <div
            style={{ height: "20px", width: "20px", backgroundColor: "red" }}
          >
            d
          </div>
        </option>
        <option value="girl">Girl</option>
      </select> */}
      <CustomSelect
        options={themes}
        onChange={handleSelectChange}
        defaultValue={themes[0]}
      />
      <CustomSelect
        options={character}
        onChange={handleCharacterChange}
        defaultValue={character[0]}
      />
    </header>
  )
}

export default Header

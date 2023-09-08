import React, { useState } from "react"
// import "./App.css"
import "./MainApp.css"
// import "./Header.css"
import { Link, useNavigate } from "react-router-dom"
import AI from "./assests/AI_latest.mp4"
import BG from "./assests/futuristic_bg.mp4"

const MainApp = () => {
  const [showControls, setshowControls] = useState(false)
  const [showPlayButton, setshowPlayButton] = useState(true)

  let navigate = useNavigate()
  const myCallback = () => {
    navigate("/chat")
  }

  const playVideo = () => {
    setshowPlayButton(false)
    let vid = document.getElementById("vidH") as HTMLVideoElement
    if (vid) {
      vid.play()
    }
  }

  return (
    <div className="mainApp">
      {!showControls ? (
        <div className="videoContainer">
          <video
            width="100%"
            height="100%"
            // muted
            autoPlay
            // playsInline
            id="vidH"
            onEnded={() => setshowControls(true)}
          >
            <source src={AI} type="video/mp4"></source>
          </video>
          <div
            className={`play-button-outer ${showPlayButton ? null : "hide"}`}
            onClick={playVideo}
          >
            <div className="play-button"></div>
          </div>
          <div className="skipWrapper">
            <button onClick={() => setshowControls(true)}>
              Activate I Producer
            </button>
          </div>
        </div>
      ) : null}
      {showControls ? (
        <div className="videoContainer">
          <video width="100%" height="100%" muted autoPlay playsInline loop>
            <source src={BG} type="video/mp4"></source>
          </video>
          <div className="controlWrapper">
            <Link to={"/chat"}>
              <button>Activate I Producer</button>
            </Link>
            {/* <button onClick={myCallback}>Activate I Producer</button> */}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MainApp

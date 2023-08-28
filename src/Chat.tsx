import React, { useState, useRef, useEffect } from "react"
import "./Chat.scss"

import { ReactComponent as TwitterGif } from "./assests/icons/twitter/gif.svg"
import { ReactComponent as TwitterImage } from "./assests/icons/twitter/image.svg"
import { ReactComponent as TwitterSend } from "./assests/icons/twitter/send.svg"
import { ReactComponent as TwitterArrow } from "./assests/icons/twitter/arrow.svg"
import { ReactComponent as TwitterInfo } from "./assests/icons/twitter/info.svg"

import { ReactComponent as InstagramMic } from "./assests/icons/instagram/mic.svg"
import { ReactComponent as InstagramImage } from "./assests/icons/instagram/image.svg"
import { ReactComponent as InstagramHeart } from "./assests/icons/instagram/heart.svg"
import { ReactComponent as InstagramSmile } from "./assests/icons/instagram/smile.svg"
import { ReactComponent as InstagramCall } from "./assests/icons/instagram/call.svg"
import { ReactComponent as InstagramVideo } from "./assests/icons/instagram/video.svg"
import { ReactComponent as InstagramInfo } from "./assests/icons/instagram/info.svg"

import { ReactComponent as MessengerMic } from "./assests/icons/messenger/mic.svg"
import { ReactComponent as MessengerImage } from "./assests/icons/messenger/image.svg"
import { ReactComponent as MessengerGif } from "./assests/icons/messenger/gif.svg"
import { ReactComponent as MessengerLike } from "./assests/icons/messenger/like.svg"
import { ReactComponent as MessengerPlus } from "./assests/icons/messenger/plus.svg"
import { ReactComponent as MessengerSmile } from "./assests/icons/messenger/smile.svg"
import { ReactComponent as MessengerVideo } from "./assests/icons/messenger/video-call.svg"
import { ReactComponent as MessengerCall } from "./assests/icons/messenger/call.svg"
import { ReactComponent as MessengerArrow } from "./assests/icons/messenger/arrow.svg"
import { ReactComponent as MessengerInfo } from "./assests/icons/messenger/info.svg"

import LineImage from "./assests/icons/line/image.png"
import LineCamera from "./assests/icons/line/camera.png"
import LinePlus from "./assests/icons/line/plus.png"
import LineMic from "./assests/icons/line/mic.png"
import LineSearch from "./assests/icons/line/search.png"
import LineList from "./assests/icons/line/list.png"
import LineMenu from "./assests/icons/line/menu.png"
import LineArrow from "./assests/icons/line/arrow.png"
import { ReactComponent as LineSmile } from "./assests/icons/line/smile.svg"

// import boyIcon from "./assests/icons/boy.png"
// import girlIcon from "./assests/icons/girl.png"

import morikoshiIcon from "./assests/icons/morikoshi.png"
import manIcon from "./assests/icons/man.png"
import womanIcon from "./assests/icons/woman.png"

import boyVideo from "./assests/og.mp4"
import girlVideo from "./assests/girl.mp4"

import manImage from "./assests/center_ui/man_c.png"
import womanImage from "./assests/woman.png"
import morikoshiImage from "./assests/morikoshi.png"

// import axios from "axios"
import { Loader } from "@mantine/core"
import TypewriterAnimation from "./TypewriterAnimation"

import { io } from "socket.io-client"

const URL = "https://express-socket-hyg3.onrender.com/"

export const socket = io(URL)

interface Message {
  content: string
  sender: "sender" | "receiver"
  status?: string
}

const ChatApp = ({
  theme,
  setTheme,
  character,
  setCharacter,
}: {
  theme: string
  setTheme: React.Dispatch<React.SetStateAction<string>>
  setCharacter: React.Dispatch<React.SetStateAction<string>>
  character: string
}) => {
  const [status, setStatus] = useState<string>("success")
  // const [videoLoop, setvideoLoop] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [chatscroll, setchatScroll] = useState<boolean>(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const [inputValue, setInputValue] = useState("")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      console.log(message)
      const newMessage: Message = {
        content: message,
        sender: "receiver",
      }
      setMessages((prevInput) => [...prevInput, newMessage])
      setStatus("success")
    })
    // eslint-disable-next-line
  }, [socket])

  useEffect(() => {
    scrollToBottom()
  }, [messages, chatscroll])
  useEffect(() => {
    setMessages([])
  }, [character])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleSendMessage()
    }
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") {
      return
    }
    const newMessage: Message = {
      content: inputValue,
      sender: "sender",
    }
    // console.log(inputValue)
    socket.emit("message", inputValue)

    setMessages((prevInput) => [...prevInput, newMessage])
    // getResponse(inputValue)
    setInputValue("")
  }

  const getAvatorIcon = (type: string) => {
    switch (type) {
      case "man":
        return manIcon
      case "woman":
        return womanIcon
      case "morikoshi":
        return morikoshiIcon
      default:
        return manIcon
    }
  }

  const getAvatorName = (type: string) => {
    switch (type) {
      case "man":
        return "Avator 1"
      case "woman":
        return "Avator 2"
      case "morikoshi":
        return "Morikoshi"
      default:
        return "Avator 1"
    }
  }

  const getAvatorImage = (type: string) => {
    switch (type) {
      case "man":
        return manImage
      case "woman":
        return womanImage
      case "morikoshi":
        return morikoshiImage
      default:
        return manImage
    }
  }

  return (
    <div className="chat-app" data-theme={theme}>
      {theme === "twitter" ? (
        <header className="header twitter">
          <TwitterArrow style={{ marginLeft: 10 }} />
          <div className="user">
            <img
              src={getAvatorIcon(character)}
              alt="boy logo"
              className="profile"
            />
            <h4>{getAvatorName(character)}</h4>
          </div>
          <div className="icons" style={{ marginRight: 10 }}>
            <TwitterInfo className="twitter-logo" />
          </div>
        </header>
      ) : null}
      {theme === "instagram" ? (
        <header className="header instagram">
          <TwitterArrow style={{ marginLeft: 10 }} />
          <div className="user">
            <img
              src={getAvatorIcon(character)}
              alt="boy logo"
              className="profile"
            />
            <h4>{getAvatorName(character)}</h4>
          </div>
          <div className="icons" style={{ marginRight: 10, gap: 10 }}>
            <InstagramCall className="instagram-logo" />
            <InstagramVideo className="instagram-logo" />
            <InstagramInfo className="instagram-logo" />
          </div>
        </header>
      ) : null}
      {theme === "line" ? (
        <header className="header line">
          <img
            src={LineArrow}
            alt="img"
            className="line-logo"
            style={{ height: 27, width: 27, marginLeft: 10 }}
          />
          <div className="user">
            <img
              src={getAvatorIcon(character)}
              alt="boy logo"
              className="profile"
            />
            <h4>{getAvatorName(character)}</h4>
          </div>
          <div className="icons" style={{ marginRight: 10, gap: 10 }}>
            <img
              src={LineSearch}
              alt="img"
              className="line-logo"
              style={{ height: 27, width: 27 }}
            />
            <img
              src={LineList}
              alt="img"
              className="line-logo"
              style={{ height: 27, width: 27 }}
            />
            <img
              src={LineMenu}
              alt="img"
              className="line-logo"
              style={{ height: 27, width: 27 }}
            />
          </div>
        </header>
      ) : null}
      {theme === "messenger" ? (
        <header className="header messenger">
          <MessengerArrow style={{ marginLeft: 10 }} />
          <div className="user">
            <img
              src={getAvatorIcon(character)}
              alt="boy logo"
              className="profile"
            />
            <h4>{getAvatorName(character)}</h4>
          </div>
          <div className="icons" style={{ marginRight: 10 }}>
            <MessengerCall className="messenger-logo" />
            <MessengerVideo className="messenger-logo" />
            <MessengerInfo className="messenger-logo" />
          </div>
        </header>
      ) : null}
      {/* comment
      
      
      
      
      
      
      
      
      
      comment */}

      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-item ${
              message.sender === "sender" ? "sender" : "receiver"
            }`}
          >
            {message.sender === "receiver" && (
              <>
                <div className="video-wrapper">
                  <div className="video-wrapper">
                    <img src={getAvatorImage(character)} alt="img" />
                  </div>
                </div>
              </>
            )}
            {message.sender === "receiver" ? (
              <div className="message-wrapper">
                {message.content}
                <div className="message-content">
                  {message.sender === "receiver" ? (
                    <TypewriterAnimation
                      text={message.content}
                      setScroll={setchatScroll}
                      // setVideoPlay={setvideoLoop}
                      videoId={`video${index}`}
                    />
                  ) : (
                    message.content
                  )}
                </div>
              </div>
            ) : (
              <div className="message-content">{message.content}</div>
            )}
          </div>
        ))}
        {status === "loading" ? (
          <>
            <div className="message-item receiver">
              <div className="video-wrapper">
                <video
                  width="100%"
                  height="100%"
                  muted
                  playsInline
                  preload="auto"
                >
                  {character === "boy" ? (
                    <source src={boyVideo} type="video/mp4"></source>
                  ) : (
                    <source src={girlVideo} type="video/mp4"></source>
                  )}
                </video>
              </div>
              <div className="message-content loader">
                <Loader variant="dots" size={"xs"} />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* comment








      comment */}

      {theme === "twitter" ? (
        <div className="input-area">
          <div className="input-container">
            <div className="icons">
              {/* <SendLogo className="logo" /> */}
              {/* <TwitterImage className="logo" />
              <TwitterGif className="logo" />
              <InstagramCamera className="logo" /> */}
              <TwitterGif className="twitter-logo" />
              <TwitterImage className="twitter-logo" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              disabled={status === "loading"}
            />
            <button onClick={handleSendMessage} disabled={status === "loading"}>
              {/* <SendLogo className="logo send" /> */}
              <TwitterSend className="twitter-logo" />
            </button>
          </div>
        </div>
      ) : null}

      {theme === "instagram" ? (
        <div className="input-area">
          <div className="input-container">
            <div className="icons">
              <InstagramSmile className="instagram-logo" />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              disabled={status === "loading"}
            />
            <div className="icons">
              <InstagramMic className="instagram-logo" />
              <InstagramImage className="instagram-logo" />
              <InstagramHeart className="instagram-logo" />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={status === "loading"}
              className="instagram-button"
            >
              <h3 style={{ color: "#0095F6", margin: 0 }}>send</h3>
            </button>
          </div>
        </div>
      ) : null}

      {theme === "messenger" ? (
        <div className="input-area">
          <div className="outer-icons">
            <MessengerPlus className="messenger-logo" />
            <MessengerImage className="messenger-logo" />
            <MessengerGif className="messenger-logo" />
            <MessengerMic className="messenger-logo" />
          </div>
          <div className="input-container">
            <div className="icons"></div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              disabled={status === "loading"}
            />
            <div className="icons">
              <MessengerSmile className="messenger-logo" />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={status === "loading"}
            ></button>
          </div>
          <div className="outer-icons">
            <MessengerLike className="messenger-logo" />
          </div>
        </div>
      ) : null}

      {theme === "line" ? (
        <div className="input-area">
          <div className="outer-icons">
            <img src={LinePlus} alt="img" className="line-logo" />
            <img src={LineImage} alt="img" className="line-logo" />
            <img src={LineCamera} alt="img" className="line-logo" />
          </div>

          <div className="input-container">
            <div className="icons"></div>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
              disabled={status === "loading"}
            />
            <div className="icons">
              <LineSmile className="line-logo" />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={status === "loading"}
            ></button>
          </div>
          <div className="outer-icons">
            <img src={LineMic} alt="img" className="line-logo" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ChatApp

import React, { useState, useRef, useEffect } from "react"
import "./Chat.css"
import { ReactComponent as SendLogo } from "./assests/send-icon.svg"
import boyVideo from "./assests/og.mp4"
import girlVideo from "./assests/girl.mp4"

import axios from "axios"
import { Loader } from "@mantine/core"
import TypewriterAnimation from "./TypewriterAnimation"

interface Message {
  content: string
  sender: "sender" | "receiver"
  status?: string
}

const ChatApp = ({
  theme,
  character,
}: {
  theme: string
  character: string
}) => {
  const [status, setStatus] = useState<string>()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [videoLoop, setvideoLoop] = useState<boolean>(false)
  const [chatscroll, setchatScroll] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])

  const [inputValue, setInputValue] = useState("")
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, chatscroll])

  useEffect(() => {
    if (character === "girl") {
      const newMessage: Message = {
        content:
          "やあ、美容業界についてなんでも聞いてほしいんやろ？なんでも答えるから、どんなことでも聞いてくれたらうれしいな！",
        sender: "receiver",
      }
      setMessages([])
      setTimeout(() => {
        setMessages([newMessage])
      }, 500)
    }
    if (character === "boy") {
      const newMessage: Message = {
        content:
          "こんにちは！美容業界のこと、何でも聞いてくれるんだね？なんでも答えるから、遠慮せずに聞いてみてよ！",
        sender: "receiver",
      }
      setMessages([])
      setTimeout(() => {
        setMessages([newMessage])
      }, 500)
    }
  }, [character])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleSendMessage()
    }
  }

  const getResponse = async (inputValue: any) => {
    setStatus("loading")
    let avatartype: number = 0
    if (character === "boy") {
      avatartype = 0
    } else {
      avatartype = 1
    }
    try {
      const response = await axios.post(
        "https://senju-api.willeder.com/chatbot",
        {
          question: inputValue,
          avatarType: avatartype,
        }
      )
      const data = await response.data

      setStatus("success")
      const newMessage: Message = {
        content: data,
        sender: "receiver",
      }

      setMessages((prevInput) => [...prevInput, newMessage])
    } catch (error) {
      console.log(error)
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

    setMessages((prevInput) => [...prevInput, newMessage])
    getResponse(inputValue)
    setInputValue("")
  }
  return (
    <div className="chat-app" data-theme={theme}>
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
                  <video
                    width="100%"
                    height="100%"
                    muted
                    autoPlay
                    playsInline
                    id={`video${index}`}
                    loop={videoLoop}
                  >
                    {character === "boy" ? (
                      <source src={boyVideo} type="video/mp4"></source>
                    ) : (
                      <source src={girlVideo} type="video/mp4"></source>
                    )}
                  </video>
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
                      setVideoPlay={setvideoLoop}
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
              <div className="loader message-content">
                <Loader variant="dots" size={"xs"} />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
          onKeyDown={handleKeyDown}
          disabled={status === "loading"}
        />
        <button onClick={handleSendMessage} disabled={status === "loading"}>
          <SendLogo width={60} height={60} className="logo" />
        </button>
      </div>
    </div>
  )
}

export default ChatApp

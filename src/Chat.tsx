import React, { useState, useEffect, useRef } from "react"
import "./Chat.css"
import talkVideo from "./assests/talk.mp4"

interface Message {
  content: string
  sender: "sender" | "receiver"
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello", sender: "receiver" },
    { content: "Hi there!", sender: "sender" },
    { content: "How are you?", sender: "receiver" },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const typingAnimationRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const getResponse = async (inputValue: any) => {
    try {
      const formData = new FormData()
      formData.append("question", inputValue)
      // const response: any = await fetch("http://172.104.206.85/chatbot", {
      const response: any = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ question: inputValue }),
        body: formData,
      })
      const data = await response.json()
      console.log(data)
      const newMessage: Message = {
        content: data.data.message,
        sender: "receiver",
      }

      setMessages((prevInput) => [...prevInput, newMessage])

      // ...
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

  useEffect(() => {
    if (typingAnimationRef.current && !isVideoLoaded) {
      typingAnimationRef.current.classList.add("typing-animation")
    }
  }, [isVideoLoaded])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

  return (
    <div className="chat-app">
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
                <video
                  width="74"
                  height="68"
                  // src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
                  src={talkVideo}
                  // controls
                  autoPlay
                />
              </>
            )}
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatApp

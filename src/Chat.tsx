import React, { useState } from "react"
import "./Chat.css"
import talkVideo from "./assests/talk-cropped.mp4"
import axios from "axios"

interface Message {
  content: string
  sender: "sender" | "receiver"
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello, how can i help you", sender: "receiver" },
  ])

  const [inputValue, setInputValue] = useState("")
  // const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  // const typingAnimationRef = useRef<HTMLDivElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const getResponse = async (inputValue: any) => {
    try {
      const response = await axios.post("http://172.104.206.85/chatbot", {
        question: inputValue,
      })
      const data = await response.data

      console.log(data)
      const newMessage: Message = {
        content: data,
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

  // useEffect(() => {
  //   if (typingAnimationRef.current && !isVideoLoaded) {
  //     typingAnimationRef.current.classList.add("typing-animation")
  //   }
  // }, [isVideoLoaded])

  // const handleVideoLoad = () => {
  //   setIsVideoLoaded(true)
  // }

  return (
    // <div className="chatWrapper">
    //   <div className="chat">
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //     <h1>test</h1>
    //   </div>
    //   <div className="inputWrapper">
    //     <input type="text" />
        
    //   </div>
    // </div>
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
              <div className="video-wrapper">
                <video width="100%" height="100%" src={talkVideo} autoPlay />
              </div>
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

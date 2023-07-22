import React, { useState, useRef, useEffect } from 'react'
import './Chat.css'
import talkVideo from './assests/talk-cropped.mp4'
import axios from 'axios'
import { Loader } from '@mantine/core'
import TypewriterAnimation from './TypewriterAnimation'

interface Message {
  content: string
  sender: 'sender' | 'receiver'
  status?: string
}

const ChatApp: React.FC = () => {
  const [status, setStatus] = useState<string>()
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      content: 'Hello, how can i help you',
      sender: 'receiver',
    },
  ])

  const [inputValue, setInputValue] = useState('')
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleSendMessage()
    }
  }

  const getResponse = async (inputValue: any) => {
    setStatus('loading')

    try {
      const response = await axios.post('https://senju-api.willeder.com/chatbot', {
        question: inputValue,
      })
      const data = await response.data

      setStatus('success')
      const newMessage: Message = {
        content: data,
        sender: 'receiver',
      }

      setMessages((prevInput) => [...prevInput, newMessage])
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') {
      return
    }
    const newMessage: Message = {
      content: inputValue,
      sender: 'sender',
    }

    setMessages((prevInput) => [...prevInput, newMessage])
    getResponse(inputValue)
    setInputValue('')
  }
  return (
    <div className='chat-app'>
      <div className='message-list'>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-item ${message.sender === 'sender' ? 'sender' : 'receiver'}`}>
            {message.sender === 'receiver' && (
              <div className='video-wrapper'>
                <video
                  // width='100%'
                  // height='100%'
                  // src={talkVideo}
                  muted
                  autoPlay
                  // onContextMenu={(e) => e.preventDefault()}
                  playsInline
                  loop
                  controls>
                  <source
                    src={talkVideo}
                    type='video/mp4'></source>
                </video>
              </div>
            )}
            <div className='message-content'>{message.sender === 'receiver' ? <TypewriterAnimation text={message.content} /> : message.content}</div>
          </div>
        ))}
        {status === 'loading' ? (
          <>
            <div className='message-item receiver'>
              <div className='video-wrapper'>
                <video
                  width='100%'
                  height='100%'
                  src={talkVideo}
                  autoPlay
                  muted
                  // onContextMenu={(e) => e.preventDefault()}
                  playsInline
                  loop
                  controls
                />
              </div>
              <div className='message-content'>
                <Loader
                  variant='dots'
                  size={'xs'}
                />
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='input-area'>
        <input
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          placeholder='Type your message...'
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default ChatApp

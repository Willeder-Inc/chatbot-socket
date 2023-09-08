import React from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "../MainApp"
import ChatApp from "../ChatApp"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <ChatApp />,
  },
])

export default router

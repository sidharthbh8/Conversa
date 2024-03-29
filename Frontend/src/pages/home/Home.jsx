import { useState, useEffect } from "react"
import MessageContainer from "../../components/messages/MessageContainer"
import Sidebar from "../../components/sidebar/Sidebar"
import useLogin from "../../hooks/useLogin"
const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h- bg-white-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
        <Sidebar />
        <MessageContainer />
    </div>
  )
}
export default Home
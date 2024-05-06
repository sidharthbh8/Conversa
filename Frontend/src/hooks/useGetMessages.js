import { useState, useEffect } from "react"
import useConversation from "../zustand/useConversation"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useGetMessages = () => {

  const [loading, setLoading] = useState(false)
  const { authUser } = useAuthContext()
  const {selectedConversation, messages, setMessages,} = useConversation()
  
  useEffect(() => {
    if(selectedConversation !== null) {
        getMessages()
    }
  }, [selectedConversation, setMessages])

  const getMessages = async () => {
    setLoading(true)
    try {
        const res = await fetch(`http://localhost:5000/api/messages/${selectedConversation._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authUser.token}`
            }
        })
        const data = await res.json()
        if (data.error) {
            toast.error(data.error)
        }
        setLoading(false)
        setMessages(data)
    } catch (e) {
        toast.error(`Error Occured: ${e.message}`)
    }
  }

  return { loading, messages }

}
export default useGetMessages
import { useState } from "react"
import { toast } from "react-hot-toast"
import useConversation from "../zustand/useConversation"
import { useAuthContext } from "../context/AuthContext"

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const {authUser} = useAuthContext()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + authUser.token,
                },
                body: JSON.stringify({ message }),
            })
            setLoading(false)
            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.message)
        }
    }
    return { loading, sendMessage }
}
export default useSendMessage
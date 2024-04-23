import { useAuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

const useSelectedConversation = () => {
    const [selectedConversation, setSelectedConversation] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { authUser } = useAuthContext()

    useEffect(() => {
        const conversation = async () => {
            setIsLoading(true)
            try {
                const res = await fetch('http://localhost:5000/api/users/', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + authUser.token,
                        'Content-Type': 'application/json',
                    }
                })
                const data = await res.json()
                if (data.error) {
                    toast.error('Error fetching conversations')
                }
                setSelectedConversation(data)
                setIsLoading(false)
            } catch (error) {
                console.error(error.message)
            }
        }
        conversation()
    }, [])
    return ({ isLoading, selectedConversation, setSelectedConversation })
}

export default useSelectedConversation
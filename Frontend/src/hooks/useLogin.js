import { useState } from "react"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { authUser, setAuthUser } = useAuthContext()

    const login = async (username, password) => {
        if (!username || !password) {
            return toast.error('Please fill both fields')
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            const data = await res.json()
            if (data.error) {
                toast.error(data.error)
            }
            setLoading(false)
            toast.success('Logged in successfully')
            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)
            const token = 'secureToken=' + encodeURIComponent(authUser.token);
            console.log(data);
            document.cookie = token;    
        } catch (error) {
            console.error(error.message)
        }
    }
    return { loading, login }
}
export default useLogin
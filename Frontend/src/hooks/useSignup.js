import toast from "react-hot-toast"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { authUser, setAuthUser } = useAuthContext()

    const signup = async ({ fullName, username, password, confirmPassword, email }) => {
        if (!fullName || !username || !password || !confirmPassword || !email) {
            return toast.error('Please fill in all fields')
        }
        setLoading(true)
        try {
            const res = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, username, password, confirmPassword, email })
            })

            const data = await res.json()
            if(data.error){
                toast.error(data.error)
            }
            setLoading(false)
            toast.success('Signed up successfully')
            
            // localstorage (save user data in localstorage)
            localStorage.setItem('chat-user', JSON.stringify(data))
            // context (save user data in context )
            setAuthUser(data)
        } catch (e) {
            toast.error(e.message)
        }
    }
    return {loading, signup}
}
export default useSignup
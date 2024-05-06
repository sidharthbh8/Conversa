import { createContext, useContext, useEffect, useState } from "react"
import { useAuthContext } from "./AuthContext"
import { io } from "socket.io-client"

const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
    const {authUser} = useAuthContext()
    
    useEffect(() => {
        if(authUser){
            const socket  = io('http://localhost:5000', {
                query: {
                    userId: authUser._doc._id
                },
            })

            setSocket(socket)

            socket.on('getOnlineUsers', (users) => {
                setOnlineUser(users)
            })

            return () => socket.close()
        }
        else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{socket, onlineUser}}>{children}</SocketContext.Provider>
}

export default SocketContext

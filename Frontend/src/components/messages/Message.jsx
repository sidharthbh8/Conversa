import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = (props) => {
  const { message } = props;
  const {authUser} = useAuthContext()
  const {selectedUser} = useConversation()
  
  const isSent = message.sender === authUser._id
  const charStartName = isSent ? 'chat-end' : 'chat-start'
  const bubbleBg = isSent ? 'bg-blue-500' : 'bg-gray-700'

  const profilePic = isSent ? authUser._doc.profilePic.data : selectedUser.profilePic
  const bufferArray = new Uint8Array(profilePic);
  const binaryString = String.fromCharCode(...bufferArray);
  const base64ImageData = btoa(binaryString);

  return (
    <div className={`chat ${charStartName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={`data:image/png;base64,${base64ImageData}`}
            alt="user identicon"
          />
        </div>
      </div>
  
      <div className={`chat-bubble ${bubbleBg}`}>{message.message}</div>
      <div className="chat-footer opacity-50">{`Seen At`}</div>
    </div>
  );
};
export default Message;
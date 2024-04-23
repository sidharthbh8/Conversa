import { useState } from "react";
import useSelectedConversation from "../../hooks/useSelectedConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  // const [selectedConversation, setSelectedConversation] = useState([])
  const { isLoading, selectedConversation } = useSelectedConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        selectedConversation.map((user) => {
          return <Conversation key={user._id} user={user} />;
        })
      )}
    </div>
  );
};
export default Conversations;

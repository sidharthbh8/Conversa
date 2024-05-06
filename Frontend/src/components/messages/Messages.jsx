import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import useListenMessage from "../../hooks/useListenMessage";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessage()
  const lastMessageRead = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRead.current?.scrollIntoView({ behavior: "smooth" });
    },10);
  }, [messages])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && 
      messages.map((message) => (
        <div ref={lastMessageRead}>
          <Message  key={message._id} message={message} />
        </div>
      ))}
      {loading && <h1>Loading... </h1>}
      {!loading && messages.length === 0 && <p>Say "Hi" and start the Conversation!</p>}
    </div>
  );
};
export default Messages;

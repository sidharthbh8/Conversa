const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src="https://api.dicebear.com/7.x/identicon/png?seed=dj"
            alt="user identicon"
          />
        </div>
      </div>
      <div className="chat-bubble">Meow Meow Nigga</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  );
};
export default Message;

import useConversation from "../../zustand/useConversation";

const Conversation = (props) => {
  const { email, fullName, gender, profilePic, username } = props.user;

  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === props.user._id;

  const bufferArray = new Uint8Array(profilePic.data);
  const binaryString = String.fromCharCode(...bufferArray);
  const base64ImageData = btoa(binaryString);

  const handleClick = () => {

    if (isSelected) {
      setSelectedConversation(null);
    } else {
      setSelectedConversation(props.user);
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
      `}
        onClick={handleClick}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={`data:image/png;base64,${base64ImageData}`}
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{username}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};
export default Conversation;
import useConvo, { ConversationType } from "../zustand/useConvo";
import { useSocketContext } from "../context/socketContect";
const Conversation = ({
  conversation,
  emoji,
}: {
  conversation: ConversationType;
  emoji: string;
}) => {
  const { setSelectedConvo, selectedConvo } = useConvo();
  const isSelected = selectedConvo?.id === conversation.id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.id);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-amber-600 rounded p-2 py-1 cursor-pointer ${
          isSelected ? `bg-amber-600` : ""
        }`}
        onClick={() => setSelectedConvo(conversation)}
      >
        <div className={`avatar relative ${isOnline ? "" : ""}`}>
          <div className="w-12 h-12 rounded-full ">
            <img src={conversation.profilePic} alt="userpic" />
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2" />
          )}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl hidden md:inline-block">{emoji}</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;

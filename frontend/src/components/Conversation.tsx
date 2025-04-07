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
        className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
          isSelected ? "bg-amber-600" : "hover:bg-amber-700/50"
        }`}
        onClick={() => setSelectedConvo(conversation)}
      >
        {/* Avatar */}
        <div className={`relative avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
            <img
              src={conversation.profilePic}
              alt="userpic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-gray-100 text-sm sm:text-base truncate">
              {conversation.fullName}
            </p>
            <span className="text-lg">{emoji}</span>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-[1px] bg-gray-700/50" />
    </>
  );
};

export default Conversation;

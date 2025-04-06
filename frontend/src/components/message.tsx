import { useAuthContext } from "../context/Authcontext";
import { timeFormat } from "../utils/timeFormat";
import useConvo, { MessageType } from "../zustand/useConvo";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConvo } = useConvo();
  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConvo?.profilePic;
  const chatClass = fromMe ? "chat-end" : "chat-start";
  const bubbleBg = fromMe ? "bg-amber-700" : "";
  return (
    <div className={`chat ${chatClass}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={img} />
        </div>
      </div>
      <p className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}>
        {message.body}
      </p>
      <span className="chat-footer opacity-50 text-xs flex gap-1 items-start">
        {timeFormat(message.createdAt)}
      </span>
    </div>
  );
};

export default Message;

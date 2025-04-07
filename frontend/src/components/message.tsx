import { useAuthContext } from "../context/Authcontext";
import { timeFormat } from "../utils/timeFormat";
import useConvo, { MessageType } from "../zustand/useConvo";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConvo } = useConvo();
  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConvo?.profilePic;

  const chatAlign = fromMe ? "justify-end" : "justify-start";
  const bubbleBg = fromMe ? "bg-amber-700" : "bg-gray-700";
  const textAlign = fromMe ? "text-right" : "text-left";
  const bubbleRadius = fromMe
    ? "rounded-tl-2xl rounded-bl-2xl rounded-br-md"
    : "rounded-tr-2xl rounded-br-2xl rounded-bl-md";

  return (
    <div className={`flex ${chatAlign} items-end gap-2 px-2 py-1`}>
      {!fromMe && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden">
          <img src={img} alt="avatar" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="max-w-[85%] sm:max-w-[75%]">
        <div
          className={`px-3 py-2 text-white ${bubbleBg} ${bubbleRadius} shadow-sm text-sm sm:text-base break-words`}
        >
          {message.body}
        </div>
        <div className={`text-xs text-gray-400 mt-0.5 ${textAlign}`}>
          {timeFormat(message.createdAt)}
        </div>
      </div>
      {fromMe && (
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden">
          <img src={img} alt="avatar" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default Message;

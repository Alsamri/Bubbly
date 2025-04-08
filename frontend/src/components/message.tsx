import { useAuthContext } from "../context/Authcontext";
import { timeFormat } from "../utils/timeFormat";
import useConvo, { MessageType } from "../zustand/useConvo";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthContext();
  const { selectedConvo } = useConvo();
  const fromMe = message?.senderId === authUser?.id;
  const img = fromMe ? authUser?.profilePic : selectedConvo?.profilePic;

  return (
    <div
      className={`flex items-end gap-2 px-4 py-1 ${
        fromMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar on left if not from me */}
      {!fromMe && (
        <img
          src={img}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover hidden sm:block"
        />
      )}

      <div className="flex flex-col max-w-[80%]">
        <div
          className={`rounded-2xl px-4 py-2 text-sm sm:text-base break-words shadow-md ${
            fromMe
              ? "bg-amber-500 text-white rounded-br-none"
              : "bg-white/90 text-gray-800 rounded-bl-none"
          }`}
        >
          {message.body}
        </div>
        <span
          className={`text-xs mt-1 ${
            fromMe
              ? "text-white/70 text-right pr-1"
              : "text-gray-500 text-left pl-1"
          }`}
        >
          {timeFormat(message.createdAt)}
        </span>
      </div>

      {/* Avatar on right if from me */}
      {fromMe && (
        <img
          src={img}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover hidden sm:block"
        />
      )}
    </div>
  );
};

export default Message;

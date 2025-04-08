import MessageInput from "./MessageInput";
import Messages from "./Messeges";
import { TiMessages } from "react-icons/ti";
import useConvo from "../zustand/useConvo";
import { useAuthContext } from "../context/Authcontext";

const MessageContainer = () => {
  const { selectedConvo } = useConvo();

  return (
    <div className="flex flex-col w-full md:min-w-[450px] bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl overflow-hidden rounded-none md:rounded-r-3xl">
      {selectedConvo ? (
        <>
          <div className="px-4 py-3 mb-5 border-b border-white/20 bg-amber-700/75 backdrop-blur-sm">
            <span className="text-sm text-white/80 mr-2">To:</span>
            <span className="text-white font-semibold tracking-wide">
              {selectedConvo.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatView />
      )}
    </div>
  );
};

const NoChatView = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center p-6 bg-white/10 backdrop-blur-lg">
      <p className="text-white/90 text-lg font-light">
        Hi {authUser?.fullName} 🌸
      </p>
      <p className="text-white/70 text-sm mt-1 mb-3">
        Select someone from your sidebar to chat 💬
      </p>
      <TiMessages className="text-5xl text-white/60 animate-bounce" />
    </div>
  );
};

export default MessageContainer;

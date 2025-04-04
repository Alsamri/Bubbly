import useConvo, { ConversationType } from "../zustand/useConvo";

const Conversation = ({
  conversation,
  emoji,
}: {
  conversation: ConversationType;
  emoji: string;
}) => {
  const { setSelectedConvo } = useConvo();
  return (
    <>
      <div
        className="flex gap-2 items-center hover:bg-amber-600 rounded p-2 py-1 cursor-pointer"
        onClick={() => setSelectedConvo(conversation)}
      >
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="userpic"></img>
          </div>
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

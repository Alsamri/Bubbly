import Conversation from "./Conversation";
import useGetConvo from "../hooks/useGetConvo";
import { ConversationType } from "../zustand/useConvo";
import { getCuteEmoji } from "../utils/userEmojis";
const Conversationlist = () => {
  const { conversations, loading } = useGetConvo();

  if (loading) return <span className="loading loading-spinner mx-auto" />;
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations?.map((conversation: ConversationType) => (
        <Conversation
          key={conversation.id}
          conversation={conversation}
          emoji={getCuteEmoji()}
        />
      ))}
    </div>
  );
};

export default Conversationlist;

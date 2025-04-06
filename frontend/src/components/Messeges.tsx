import Message from "./message";
import useGetMessages from "../hooks/useGetMessages";
const Messages = () => {
  const { loading, messages } = useGetMessages();
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length === 0
        ? "No messages"
        : messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
    </div>
  );
};

export default Messages;

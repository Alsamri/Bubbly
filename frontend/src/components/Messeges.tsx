import Message from "./message";
import useGetMessages from "../hooks/useGetMessages";
import useListenMessages from "../hooks/useListenMessages";
import chatScroll from "../hooks/chatScroll";
const Messages = () => {
  const { loading, messages } = useGetMessages();
  useListenMessages();
  const ref = chatScroll(messages) as React.RefObject<HTMLDivElement>;
  return (
    <div className="px-4 flex-1 overflow-auto" ref={ref}>
      {!loading && messages.length === 0
        ? "No messages"
        : messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
    </div>
  );
};

export default Messages;

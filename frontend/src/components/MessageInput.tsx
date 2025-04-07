import { useState } from "react";
import { BsSend } from "react-icons/bs";
import usePostMessage from "../hooks/usePostMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { postMessage, loading } = usePostMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;
    await postMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <span className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;

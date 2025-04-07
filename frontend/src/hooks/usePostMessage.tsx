import { useState } from "react";
import useConvo from "../zustand/useConvo";
import toast from "react-hot-toast";
import axios from "axios";
const usePostMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConvo } = useConvo();
  const postMessage = async (message: string) => {
    if (!selectedConvo) return;

    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:9000/api/messages"/send/${selectedConvo.id}`,
        message,
        {
          withCredentials: true, // Send cookies with the request
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessages([...messages, data]);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "send message failed!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return { postMessage, loading };
};

export default usePostMessage;

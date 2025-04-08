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
      const API_BASE_URL =
        process.env.NODE_ENV !== "development"
          ? "https://bubbly-q2bp.onrender.com"
          : "http://localhost:9000";
      const { data } = await axios.post(
        `${API_BASE_URL}/api/messages/send/${selectedConvo.id}`,
        { message },
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

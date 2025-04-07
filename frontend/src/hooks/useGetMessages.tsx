import { useEffect, useState } from "react";
import useConvo from "../zustand/useConvo";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConvo } = useConvo();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConvo) return;
      setLoading(true);
      setMessages([]);
      try {
        const API_BASE_URL =
          process.env.NODE_ENV !== "development"
            ? "https://bubbly-q2bp.onrender.com"
            : "http://localhost:9000";
        const { data } = await axios.get(
          `${API_BASE_URL}/api/messages/${selectedConvo.id}`,
          {
            withCredentials: true, // Send cookies with the request
            headers: { "Content-Type": "application/json" },
          }
        );

        setMessages(data);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "GetConvo failed!";

        toast.error(errorMessage);
      }
    };
    getMessages();
  }, [selectedConvo, setMessages]);
  return { messages, loading };
};

export default useGetMessages;

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
        const { data } = await axios.get(`/api/messages/${selectedConvo.id}`);
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

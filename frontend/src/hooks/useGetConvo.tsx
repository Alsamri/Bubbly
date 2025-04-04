import { useEffect, useState } from "react";
import { ConversationType } from "../zustand/useConvo";
import axios from "axios";
import toast from "react-hot-toast";
const useGetConvo = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getAllConvos = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/messages/conversations");
        setConversations(data);
      } catch (error: any) {
        const errorMessage = error?.response?.data?.error || "GetConvo failed!";

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getAllConvos();
  }, []);
  return { loading, conversations };
};

export default useGetConvo;

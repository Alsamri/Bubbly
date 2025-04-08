import { useEffect, useState } from "react";
import { ConversationType } from "../zustand/useConvo";
import axios from "axios";
import toast from "react-hot-toast";
const useGetConvo = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const getAllConvos = async () => {
      setLoading(true);
      try {
        const API_BASE_URL =
          process.env.NODE_ENV !== "development"
            ? "https://bubbly-q2bp.onrender.com"
            : "http://localhost:9000";
        const { data } = await axios.get(
          `${API_BASE_URL}/api/messages/conversations`,
          {
            withCredentials: true, // Send cookies with the request
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setConversations(data);
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    getAllConvos();

    return () => controller.abort();
  }, []);

  return { loading, conversations };
};
export default useGetConvo;

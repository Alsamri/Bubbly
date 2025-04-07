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
        const { data } = await axios.get(
          "http://localhost:9000/api/messages/conversations",
          {
            withCredentials: true, // Send cookies with the request
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        setConversations(data);
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          console.error("Fetch error:", error);
          toast.error(error.response?.data?.error || "Failed to load users");
        }
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

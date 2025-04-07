import { useEffect } from "react";
import { useSocketContext } from "../context/socketContect";
import useConvo from "../zustand/useConvo";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConvo();
  useEffect(() => {
    socket?.on("newMessages", (newMessages) => {
      setMessages([...messages, newMessages]);
    });
    return () => {
      socket?.off("newMessages");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;

import { useEffect } from "react";
import { useSocketContext } from "../context/socketContect";
import useConvo from "../zustand/useConvo";
import notiftics from "../soundEffect/notification.mp3.wav";
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConvo();
  useEffect(() => {
    socket?.on("newMessages", (newMessages) => {
      newMessages.shouldShake = true;
      const sound = new Audio(notiftics);
      sound.play();
      setMessages([...messages, newMessages]);
    });
    return () => {
      socket?.off("newMessages");
    };
  }, [socket, messages, setMessages]);
};

export default useListenMessages;

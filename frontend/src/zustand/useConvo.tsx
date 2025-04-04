import { create } from "zustand";

type MessageType = {
  id: string;
  body: string;
  senderId: string;
};

type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
};

interface ConversationState {
  selectedConvo: ConversationType | null;
  messages: MessageType[];
  setSelectedConvo: (conversation: ConversationType | null) => void;
  setMessages: (messages: MessageType[]) => void;
}
const useConvo = create<ConversationState>((set) => ({
  selectedConvo: null,
  messages: [],
  setSelectedConvo: (conversation) => set({ selectedConvo: conversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConvo;

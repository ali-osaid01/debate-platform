import socket from '@/sockets/socket';
import { IChat } from '@/types/interface/chat.interface';
import { create } from 'zustand';




interface ChatStore {
    chats: IChat[];
    currentChat: IChat | null;
    setChats: (chats: IChat[]) => void;
    setCurrentChat: (chat: IChat | null) => void;

}

export const useChatStore = create<ChatStore>((set) => ({
    chats: [],
    currentChat: null,
    
    setChats: () => {
        socket.on('chat-list', (chats: IChat[]) => {
            console.log("CHATS FETCHED ->",chats)
        });
    },
    setCurrentChat: (chat) => set({ currentChat: chat })
}));


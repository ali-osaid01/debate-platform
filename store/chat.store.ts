import socket from '@/sockets/socket';
import { SOCKET_EVENTS } from '@/types/enum';
import { IChat } from '@/types/interface/chat.interface';
import { create } from 'zustand';




interface ChatStore {
    chats: IChat[];
    currentChat: string | null;
    fetchChats: (user:string) => void;
    setCurrentChat: (id:string | null) => void;

}

export const useChatStore = create<ChatStore>((set) => ({
    chats: [],
    currentChat: null,
    
    fetchChats: (user:string) => {
        socket.emit(SOCKET_EVENTS.CHAT_LIST,()=>{
            console.log("Chat List Fetched")
        })
        socket.on(`${SOCKET_EVENTS.CHAT_LIST}-${user}`, (response: {chats:IChat[]}) => {
            console.log("CHATS FETCHED ->",response)
            set({ chats: response.chats });
        });
    },
    setCurrentChat: (chat) => set({ currentChat: chat })
}));


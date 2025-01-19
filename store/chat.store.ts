import socket from '@/sockets/socket';
import { SOCKET_EVENTS } from '@/types/enum';
import { IChat } from '@/types/interface/chat.interface';
import { IMessage } from '@/types/interface/message.interface';
import { toast } from 'sonner';
import { create } from 'zustand';

interface ChatStore {
    chats: IChat[];
    currentChat: IChat | null;
    messages: IMessage[];
    fetchChats: (userId: string) => void;
    setCurrentChat: (chat: IChat | null) => void;
    fetchMessages: (page?: number, limit?: number) => void;
    sendMessage: (message: string, type?: string,media?:string) => void;
    receiveNewMessage: () => void;
    onLeaveChat: () => void;
    onLeaveRoom: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
    chats: [],
    currentChat: null,
    messages: [],

    fetchChats: (userId: string) => {
        const chatListEvent = `${SOCKET_EVENTS.CHAT_LIST}-${userId}`;
        socket.emit(SOCKET_EVENTS.CHAT_LIST);
        
        console.log("FETCH CHAT WORKING")
        socket.on(chatListEvent, (response: { chats: IChat[] }) => {
            console.log("response ->", response)
            set({ chats: response.chats });
        });
    },

    fetchMessages: (page = 1, limit = 10000) => {
        const currentChatId = get().currentChat?.id;

        if (!currentChatId) {
            console.warn('No current chat selected, cannot fetch messages.');
            return;
        }
        const messageListEvent = `${SOCKET_EVENTS['FETCH-CHAT-MESSAGE']}-${currentChatId}`;

        const payload = { chat: currentChatId, page, limit };
        socket.emit(SOCKET_EVENTS['FETCH-CHAT-MESSAGE'], payload);

        socket.on(messageListEvent, (response: { data: IMessage[] }) => {
            console.log("response ->", response)
            set({ messages: response.data });
        });
    },

    setCurrentChat: (chat) => {
        socket.emit(SOCKET_EVENTS['USER-JOIN-ROOM'], chat?.id);
        set({ currentChat: chat });
    },

    sendMessage: (message, type = 'text',media) => {
        const { currentChat,receiveNewMessage } = get();
        console.log("SEND MESSAGE ->", message,media)
        const payload = { chat: currentChat?.id, message, type,media };
        socket.emit(SOCKET_EVENTS.SEND_MESSAGE, payload);
        receiveNewMessage();
    },

    receiveNewMessage: () => {
        socket.removeAllListener(SOCKET_EVENTS.NEW_MESSAGE);
        socket.on(SOCKET_EVENTS.NEW_MESSAGE, (data: {message:IMessage}) => {
            console.log("NEW MESSAGE ->", data)
            set((state) => ({ messages: [...state.messages, data.message] }));
        });
    },

    onLeaveChat: () => {
        const { currentChat,receiveNewMessage } = get();
        socket.emit(SOCKET_EVENTS['USER-LEAVE'], currentChat?.id);
        receiveNewMessage();
        toast("Chat left Successfully");
    },

    onLeaveRoom: () => {
        const { currentChat } = get();
        socket.emit(SOCKET_EVENTS['USER-LEAVE-ROOM'], currentChat?.id);
        set({ currentChat: null, messages: [] });
    }
}));

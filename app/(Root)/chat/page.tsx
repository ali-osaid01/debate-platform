'use client'
import { useEffect } from 'react'
import socket from '@/sockets/socket'
import { getAccessToken } from '@/services/middleware'
import ChatList from '@/components/shared/chat-list'
import MessageBox from '@/components/shared/message-box'
import { useIsMobile } from '@/hooks/use-mobile'

export default function ChatPage() {
  const isMobile = useIsMobile()
 
  
  useEffect(() => {
    const token = getAccessToken()
    socket.initializeSocket(token as string)
    console.log("======SOCKET CONNECTED======")
    return () => {
      socket.removeAllListener()
    }
  }, [])

  return (
    <div className="flex">
      <ChatList showMessages={isMobile ? false : true}/>
      <MessageBox isMobile={isMobile}/>
    </div>
  )
}
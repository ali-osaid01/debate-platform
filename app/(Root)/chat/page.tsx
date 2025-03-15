'use client'
import { useEffect, useState } from 'react'
import socket from '@/sockets/socket'
import { getAccessToken } from '@/services/middleware'
import ChatList from '@/components/shared/chat-list'
import MessageBox from '@/components/shared/message-box'
import { useIsMobile } from '@/hooks/use-mobile'

export default function ChatPage() {
  const isMobile = useIsMobile()
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  
  useEffect(() => {
    const token = getAccessToken()
    socket.initializeSocket(token as string)
    setIsSocketConnected(true)
    return () => {
      socket.removeAllListener()
    }
  }, [])

  return (
    <div className="flex">
      <ChatList isMobile={isMobile} isSocketConnected={isSocketConnected}/>
      <MessageBox isMobile={isMobile}/>
    </div>
  )
}
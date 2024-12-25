'use client'

import { useEffect } from 'react'

import socket from '@/sockets/socket'
import { getAccessToken } from '@/services/middleware'
import { useChatSettings } from '@/store/chat-setting.store'
import ChatList from '@/components/shared/chat-list'
import MessageBox from '@/components/shared/message-box'
import { useIsMobile } from '@/hooks/use-mobile'

export default function ChatPage() {
  const {showMessage} = useChatSettings()
  const isMobile = useIsMobile()
 
  
  useEffect(() => {
    const token = getAccessToken()
    socket.initializeSocket(token as string)
  }, [])

  
  return (
    <div className="flex bg-background">
      <ChatList showMessages={showMessage}/>
      <MessageBox isMobile={isMobile}/>
    </div>
  )
}
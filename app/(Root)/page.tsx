import Analytics from '@/components/shared/Analytics'
import Content from '@/components/shared/Content'
import Hero from '@/components/shared/Hero'
import JoinUs from '@/components/shared/Join-Us'
import React from 'react'

export default function page() {
  return (
    <div className='flex-1'>
        <Hero/>
        <Analytics/>
        <Content/>
        <JoinUs/>
    </div>
  )
}

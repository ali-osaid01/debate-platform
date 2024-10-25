import Analytics from '@/components/shared/Analytics'
import Hero from '@/components/shared/Hero'
import React from 'react'

export default function page() {
  return (
    <main className='flex-1'>
        <Hero/>
        <Analytics/>
    </main>
  )
}

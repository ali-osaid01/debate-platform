import React from 'react'
import backgroundImage from '@/public/assets/debate.jpg'
import Image from 'next/image'
import { Button } from '../ui/button'

export default function Hero() {
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="relative lg:absolute -z-10 my-5">
        <Image
          src={backgroundImage}
          alt="Background image of a debate"
        />
      </div>
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none inline-flex animate-text-gradient bg-gradient-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-[200%_auto] text-3xl text-center text-transparent font-medium bg-clip-text">
              Welcome to the Future of Debate
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Join the world's largest virtual debate platform. Engage in meaningful discussions, challenge your
              perspectives, and connect with diverse minds.
            </p>
          </div>
          <div className="space-x-4">
            <Button>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}



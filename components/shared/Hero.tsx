import React from 'react'
import backgroundImage from '@/public/assets/debate.jpg'
import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/drawer-dialog"
import { ScrollArea } from '../ui/scroll-area'

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
              Join the world&apos;s largest virtual debate platform. Engage in meaningful discussions, challenge your
              perspectives, and connect with diverse minds.
            </p>
          </div>
          <div className="space-x-4">
            <Link href={'/sign-up'}>
              <Button>Get Started</Button>
            </Link>
            <Credenza>
              <CredenzaTrigger asChild>
                <Button variant={'outline'}>Learn More</Button>
              </CredenzaTrigger>
              <CredenzaContent>
                <CredenzaTitle className='text-center pt-2'>
                  About US
                </CredenzaTitle>
                <ScrollArea className='h-[calc(40vh-8rem)]'>
                  <CredenzaBody>
                    <p className='text-sm p-2'>
                      Welcome to Virtual Debate, the ultimate platform for real-time, engaging, and thought-provoking debates. Whether you're a seasoned debater or new to the world of argumentation, Virtual Debate provides a space where your voice and ideas can shine. Our platform leverages cutting-edge video technology to connect people from all around the globe, bringing the excitement and intensity of live debates directly to you.

                      At Virtual Debate, we believe that powerful conversations drive change, inspire learning, and foster a deeper understanding of diverse perspectives. Here, you can challenge others to a debate, accept challenges on topics that spark your interest, or simply join to watch as audiences engage with new perspectives. Our community covers a wide range of topics—from current events and social issues to science, technology, and beyond—making every debate an opportunity to learn and grow.

                      Why Virtual Debate?

                      Real-Time Video Debates: Participate in live video debates with users worldwide, simulating the experience of an in-person debate from the comfort of your home.
                      Open Challenges: Post debate challenges on topics you&apos;re passionate about or accept open challenges to test your skills and viewpoints.
                      A Growing Community: Join a network of thinkers, students, and professionals who love meaningful discussions and challenging ideas.
                      Structured and Fair: Our platform includes built-in timing and moderation features, ensuring every debate is balanced and respectful.
                      Whether you&apos;re here to refine your debating skills, build confidence, or simply enjoy great discussions, Virtual Debate is here to connect you with a global community passionate about ideas.
                    </p>
                  </CredenzaBody>
                </ScrollArea>
                <CredenzaFooter>
                  <CredenzaClose asChild>
                    <Button>Close</Button>
                  </CredenzaClose>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>
        </div>
      </div>
    </div>
  )
}



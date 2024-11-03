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

  CredenzaFooter,

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
                    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
                      <h1 className="text-2xl font-bold mb-4">About Us</h1>

                      <p className="mb-4">
                        <strong>Welcome to Virtual Debate!</strong>
                      </p>

                      <p className="mb-4">
                        At Virtual Debate, we believe in the power of dialogue and the importance of diverse perspectives. Our platform is designed to foster meaningful discussions, promote critical thinking, and encourage respectful exchanges of ideas among individuals from all walks of life.
                      </p>

                      <h2 className="text-xl font-semibold mt-6 mb-2">Our Mission</h2>
                      <p className="mb-4">
                        Our mission is to create a safe and inclusive environment where users can engage in constructive debates on a wide range of topics. We strive to empower individuals to articulate their viewpoints, challenge assumptions, and explore new ideas. We believe that through respectful discourse, we can enhance understanding and promote social cohesion.
                      </p>

                      <h2 className="text-xl font-semibold mt-6 mb-2">What We Offer</h2>
                      <ul className="list-disc list-inside mb-4">
                        <li><strong>Dynamic Discussions:</strong> Participate in a variety of debates covering current events, social issues, science, technology, and more. Our platform connects you with users who share your interests and those who challenge your views.</li>
                        <li><strong>User-Friendly Experience:</strong> With a simple and intuitive interface, it&apos;s easy to join debates, share your thoughts, and interact with others. Whether you&apos;re a seasoned debater or just starting out, Virtual Debate welcomes you.</li>
                        <li><strong>Community Guidelines:</strong> We are committed to maintaining a respectful and supportive community. Our guidelines encourage constructive criticism and discourage any form of harassment or abuse, ensuring a safe space for everyone.</li>
                      </ul>

                      <h2 className="text-xl font-semibold mt-6 mb-2">Join Us</h2>
                      <p className="mb-4">
                        Whether you want to express your opinions, learn from others, or simply engage in thoughtful conversations, Virtual Debate is the place for you. Join our community today and be part of the conversation!
                      </p>

                      <h2 className="text-xl font-semibold mt-6 mb-2">Connect With Us</h2>
                      <p className="mb-4">
                        We value your feedback and suggestions. If you have any questions or ideas, feel free to reach out to us through our contact page. Together, let&apos;s make Virtual Debate a vibrant hub for discussion and learning!
                      </p>
                    </div>

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



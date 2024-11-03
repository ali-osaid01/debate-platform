import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

const JoinUs = () => (
    <div className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Join the Conversation?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Sign up now and start engaging in thought-provoking debates with people from around the world.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Link href={'/sign-up'} className='bg-black text-white hover:bg-gray-800 w-full rounded-md'>
                <Button className='bg-black text-white hover:bg-gray-800 w-full rounded-md'>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                By signing up, you agree to our{" "}
                <span className='underline font-bold cursor-pointer'>
                  Terms & Conditions
                </span>
              </p>
            </div>
          </div>
        </div>
  )

export default JoinUs
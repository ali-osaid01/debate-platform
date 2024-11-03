import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/drawer-dialog'
import { ScrollArea } from '../ui/scroll-area'

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
        <div className="text-sm text-gray-500 mt-4">
          By signing up, you agree to our{" "}
          <Credenza>
            <CredenzaTrigger asChild>
              <span className='underline'>Terms & Condition </span>
            </CredenzaTrigger>
            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Terms & Condition</CredenzaTitle>
              </CredenzaHeader>
              <ScrollArea className='h-[calc(40vh-8rem)] pr-4'>
                <CredenzaBody>
                  <div className="p-6 bg-gray-100">
                    <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>

                    <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                      By accessing and using Virtual Debate, you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. These terms apply to all visitors, users, and others who access or use the website.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">2. User Eligibility</h2>
                    <p className="mb-4">
                      You must be at least <span className="font-semibold">[minimum age, e.g., 13 or 18]</span> years old to use this website. By using Virtual Debate, you represent and warrant that you have the legal capacity to enter into a binding contract.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
                    <p className="mb-4">All users agree to:</p>
                    <ul className="list-disc list-inside mb-4">
                      <li>Respect others&apos; viewpoints and participate in constructive debates.</li>
                      <li>Not post or share any content that is abusive, defamatory, obscene, hateful, or illegal.</li>
                      <li>Not impersonate others or misrepresent your identity.</li>
                      <li>Not engage in or promote any form of harassment, discrimination, or threats.</li>
                      <li>Not use the site for any unauthorized or unlawful purpose, including violating intellectual property rights.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-2">4. User-Generated Content</h2>
                    <h3 className="text-lg font-semibold mt-4 mb-2">4.1 Responsibility</h3>
                    <p className="mb-4">
                      You are solely responsible for any content (e.g., posts, comments, or messages) you share on Virtual Debate. You agree not to post any content that violates the rights of others or any applicable law.
                    </p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">4.2 Ownership and License</h3>
                    <p className="mb-4">
                      You retain ownership of the content you create. However, by posting content on Virtual Debate, you grant us a worldwide, non-exclusive, royalty-free license to use, display, reproduce, modify, and distribute your content on our website and related marketing channels.
                    </p>

                    <h3 className="text-lg font-semibold mt-4 mb-2">4.3 Moderation</h3>
                    <p className="mb-4">
                      We reserve the right to review, edit, or remove any content that violates these terms or is deemed inappropriate, offensive, or harmful to our users or our community.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
                    <p className="mb-4">
                      All content on Virtual Debate, including but not limited to text, graphics, logos, and software, is the property of <span className="font-semibold">[Website Owner/Company Name]</span> or its content creators and is protected by intellectual property laws. Unauthorized use or reproduction of this content is prohibited without our prior written consent.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">6. Privacy Policy</h2>
                    <p className="mb-4">
                      Your use of Virtual Debate is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our website, you agree to the terms of our Privacy Policy.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">7. Disclaimer of Warranties</h2>
                    <p className="mb-4">
                      Virtual Debate is provided on an "as-is" and "as-available" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or availability of the website or its content. Your use of the site is at your own risk.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">8. Limitation of Liability</h2>
                    <p className="mb-4">
                      To the fullest extent permitted by law, Virtual Debate, its owners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website or these terms.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">9. Indemnification</h2>
                    <p className="mb-4">
                      You agree to indemnify and hold harmless Virtual Debate, its owners, affiliates, and agents from any claims, liabilities, damages, or expenses (including attorney's fees) arising out of your use of the website, violation of these terms, or infringement of any third-party rights.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">10. Modifications to Terms</h2>
                    <p className="mb-4">
                      We reserve the right to update or modify these Terms and Conditions at any time without prior notice. By continuing to use the website after changes are made, you agree to be bound by the revised terms.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">11. Termination</h2>
                    <p className="mb-4">
                      We may terminate or suspend your access to Virtual Debate at our discretion, without notice, for conduct that violates these terms or is otherwise harmful to other users or the integrity of the website.
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

export default JoinUs
'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FloatingInput } from '@/components/shared/Auth-Input'

type FormData = {
  age: string
  interests: string[]
  language: string
  city: string
  country: string
  topics: string[]
  about: string
}

const interests = ['Technology', 'Sports', 'Music', 'Art', 'Travel', 'Food', 'Fashion', 'Science']
const topics = ['Web Development', 'Mobile Apps', 'AI/ML', 'Data Science', 'Cybersecurity', 'Cloud Computing', 'IoT', 'Blockchain']
const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Arabic', 'Hindi']

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, setValue, watch } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    alert('Onboarding complete! Check console for form data.')
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FloatingInput
                type="number"
                name="age"
                placeholder="Age"
                register={register}
                required
              />
              <Select onValueChange={(value) => setValue('language', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FloatingInput
                type="text"
                name="city"
                placeholder="City"
                register={register}
                required
              />
              <FloatingInput
                type="text"
                name="country"
                placeholder="Country"
                register={register}
                required
              />
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Interests & Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select your interests:</h3>
                {interests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      onCheckedChange={(checked) => {
                        const currentInterests = watch('interests') || []
                        if (checked) {
                          setValue('interests', [...currentInterests, interest])
                        } else {
                          setValue('interests', currentInterests.filter((i) => i !== interest))
                        }
                      }}
                    />
                    <label htmlFor={interest}>{interest}</label>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Select your topics:</h3>
                {topics.map((topic) => (
                  <div key={topic} className="flex items-center space-x-2">
                    <Checkbox
                      id={topic}
                      onCheckedChange={(checked) => {
                        const currentTopics = watch('topics') || []
                        if (checked) {
                          setValue('topics', [...currentTopics, topic])
                        } else {
                          setValue('topics', currentTopics.filter((t) => t !== topic))
                        }
                      }}
                    />
                    <label htmlFor={topic}>{topic}</label>
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        )
      case 4:
        return (
          <>
            <CardHeader>
              <CardTitle>About You</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                {...register('about')}
                className="w-full h-32 p-2 border rounded-md"
                placeholder="Tell us a bit about yourself..."
              />
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <Card>
        {renderStep()}
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button type="button" onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">Complete</Button>
          )}
        </CardFooter>
      </Card>
    </form>
  )
}
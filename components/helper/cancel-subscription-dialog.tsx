"use client"

import { FC, useState } from "react"
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "../ui/drawer-dialog"
import { cancelSubscription } from "@/services/subscription.service"
import { useQueryClient } from "@tanstack/react-query"
import { STATUS } from "@/types/enum"

interface SubscriptionCancelModalProps {
    id: string
}
const SubscriptionCancelModal: FC<SubscriptionCancelModalProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false)

  const queryClient = useQueryClient();
  const handleCancelSubscription = async () => {
      setIsOpen(false)
      const {status,response} = await cancelSubscription(id);
    if(status === STATUS.SUCCESS) queryClient.invalidateQueries({queryKey:["user"]})
      console.log("Subscription response", response)
      console.log("Subscription cancelled")
  }
  return (
    <Credenza open={isOpen} onOpenChange={setIsOpen}>
      <CredenzaTrigger asChild>
        <Button 
          variant="destructive" 
          onClick={() => setIsOpen(true)}
          className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg "
        >
          Cancel Subscription
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <CredenzaHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <CredenzaTitle className="text-2xl font-bold text-gray-900 dark:text-white">Cancel Subscription</CredenzaTitle>
          <CredenzaDescription className="text-gray-600 dark:text-gray-300 mt-2">
            Are you sure you want to cancel your subscription?
          </CredenzaDescription>
        </CredenzaHeader>
        <div className="flex items-start space-x-3 bg-red-50 dark:bg-red-900/20 p-4 rounded-md mt-4">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
          <div>
            <CredenzaTitle className="text-lg font-semibold text-red-800 dark:text-red-200">Warning</CredenzaTitle>
            <CredenzaDescription className="text-red-700 dark:text-red-300 mt-1">
              Cancelling your subscription will immediately end your access to premium features.
            </CredenzaDescription>
          </div>
        </div>
        <CredenzaFooter className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-6">
          <CredenzaClose asChild>
            <Button 
              onClick={()=> setIsOpen(false)}
              className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Keep Subscription
            </Button>
          </CredenzaClose>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={()=> handleCancelSubscription()}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
          >
            Yes, Cancel Subscription
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}

export default SubscriptionCancelModal
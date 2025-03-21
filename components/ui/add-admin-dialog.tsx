"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generatePassword } from "@/utils/constant"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createAdminSchema } from "@/validation/admin.validation"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createAdmin } from "@/services/admin.service"
import { Loader2 } from "lucide-react"

type CreateAdminPayload = {
    email: string
    password: string
    name: string
    username:string
    phone: string
    profileImage?: string
  }

export function CreateAdminDialog() {
  const [password, setPassword] = React.useState("")
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateAdminPayload>({
    resolver: yupResolver(createAdminSchema),
  })

  const { mutate, status } = useMutation({
    mutationFn: createAdmin,
    onError(error) {
      console.log("ERROR ->",error)
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      })
      toast.success("Sub-admin created successfully")
      reset()
    },
  })

  const onSubmit:SubmitHandler<CreateAdminPayload> = (data) => mutate(data)

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="border-[#5EA9F7] text-[#5EA9F7] hover:text-[#5ea8f7e5] w-32"
            variant={"outline"}
          >
            Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Sub Admin</DialogTitle>
            <DialogDescription>
              This will be reflected in the sub-admin list and they will have
              the ability to control the rights.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6 pt-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">
                      Personal Data
                    </Label>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          placeholder="Type here"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Username</Label>
                        <Input
                          id="lastName"
                          placeholder="Type here"
                          {...register("username")}
                        />
                        {errors.username && (
                          <p className="text-red-500 text-sm">
                            {errors.username.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Temporary Password</Label>
                        <Input
                          id="password"
                          placeholder="ABC@#$123"
                          value={password}
                          {...register("password")}
                          onChange={(e) => {
                            setPassword(e.target.value)
                            setValue("password", e.target.value)
                          }}
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm">
                            {errors.password.message}
                          </p>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs text-blue-500 hover:text-blue-600"
                          type="button"
                          onClick={() => {
                            const newPassword = generatePassword()
                            setPassword(newPassword)
                            setValue("password", newPassword)
                          }}
                        >
                          Generate password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">
                      Account Information
                    </Label>
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Type here"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+23"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="w-full">
              <div className="flex flex-col gap-4 justify-center place-items-center w-full">
                <Button
                  className="w-96 bg-black hover:bg-black/90 h-12 mt-2"
                  type="submit"
                >
                   {status == "pending" ? <Loader2 className="animate-spin"/> : 'Add'}
                </Button>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    className="w-96 h-12"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
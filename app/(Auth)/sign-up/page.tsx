"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "@/validation/auth.validation";
import { FloatingInput } from "@/components/shared/Auth-Input";
import { IRegister } from "@/types/interface/auth.interface";
import { useFormMutation } from "@/hooks/useFormMutation";
import {
  ERROR_VALIDATION,
  SUCCESS_REGISTRATION_PASSED,
} from "@/utils/constant";
import { register as registerApi } from "@/services/auth.service";
import GoogleButton from "@/components/shared/Google-Button";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
  });

  const { handleFormSubmit } = useFormMutation<unknown, Error, IRegister>({
    mutationFn: registerApi,
    successMessage: SUCCESS_REGISTRATION_PASSED,
    errorMessage: ERROR_VALIDATION,
    route: "/login",
  });

  const onSubmit: SubmitHandler<IRegister> = async ({
    email,
    name,
    password,
    username,
  }) => {
    await handleFormSubmit({ email, name, password, username });
  };

  return (
    <form
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card className="w-full max-w-md shadow-xl bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to register
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* Name Field */}
          <div className="relative">
            <FloatingInput
              placeholder="Name"
              name="name"
              type="text"
              register={register}
            />
            {errors.name && (
              <p className="absolute -bottom-4 text-xs text-red-600">
                *{errors.name.message}
              </p>
            )}
          </div>

          {/* Username Field */}
          <div className="relative">
            <FloatingInput
              placeholder="Username"
              name="username"
              type="text"
              register={register}
            />
            {errors.username && (
              <p className="absolute -bottom-4 text-xs text-red-600">
                *{errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <FloatingInput
              placeholder="Email"
              name="email"
              type="text"
              register={register}
            />
            {errors.email && (
              <p className="absolute -bottom-4 text-xs text-red-600">
                *{errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="relative">
            <FloatingInput
              placeholder="Password"
              name="password"
              type="password"
              register={register}
            />
            {errors.password && (
              <p className="absolute -bottom-4 text-xs text-red-600">
                *{errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <FloatingInput
              placeholder="Confirm Password"
              name="cPassword"
              type="password"
              register={register}
            />
            {errors.cPassword && (
              <p className="absolute -bottom-4 text-xs text-red-600">
                *{errors.cPassword.message}
              </p>
            )}
          </div>

          <Button
            className="w-full bg-black text-white hover:bg-gray-800 mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-0">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or register with
              </span>
            </div>
          </div>

          <GoogleButton />

          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}

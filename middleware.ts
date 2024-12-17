import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const publicPaths = [
    "/",
    "/login",
    "/sign-up",
    "/forget-password",
    "/reset-password",
    "/verify-otp",
  ];
  
  // const privatePaths = ["/feed", /^\/profile\/[a-zA-Z0-9]+$/];

  // const isPrivatePath = (path:string | RegExp) => {
  //   return privatePaths.some((privatePath) => {
  //     if (typeof privatePath === "string") {
  //       return privatePath === path; // 
  //     } else if (privatePath instanceof RegExp) {
  //       return privatePath.test(path as string); 
  //     }
  //     return false;
  //   });
  // };

  const token = request.cookies.get("accessToken")?.value;
  console.log("TOKEN ->", token);

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/feed", request.nextUrl));
  }

  // if (isPrivatePath(path) && !token) {
  //   console.log("isPrivatePath Valid")
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", 
    "/login", 
    "/sign-up",
    "/forget-password",
    "/reset-password",
    "/verify-otp",
    "/feed",
    "/profile"
  ],
};

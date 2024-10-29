import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = [
    "/",
    "/login",
    "sign-up",
    "forget-password",
    "reset-password",
    "verify-otp",
  ];
  const isPublicPath = publicPaths.includes(path);

  const privatePaths = [
    "/feed",
  ];
  const isPrivatePath = privatePaths.includes(path);

  const token = request.cookies.get("accessToken")?.value;
  console.log("TOKEN ->",token)
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (isPrivatePath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "sign-up",
    "forget-password",
    "reset-password",
    "verify-otp",
    "/feed"
  ],
};
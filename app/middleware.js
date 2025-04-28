import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;
  /*TOKENS*/
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    /*DEFAULTS*/
  });

  const isLoggedIn = !!token;
  const role = token?.role;

/*PUBLIC */
  const publicPaths = ["/", "/auth/login", "/auth/register", "/products"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

 /*ADMIN*/
  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  /*BUSINESS */
  if (pathname.startsWith("/businesses/dashboard") && role !== "BUSINESS") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  /*USERS */
  if (pathname.startsWith("/user") && role !== "USER") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

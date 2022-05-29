/* Edge functions middleware, happens on the network layer */
import { NextRequest, NextResponse } from "next/server";
import { validateToken } from "../lib/jwt";

const noLoginPages = ["/signin", "/signup", "/api/signin", "/api/signup"];

const redirectToSigning = (origin) => {
  return NextResponse.redirect(`${origin}/signin`);
};
export default (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  if (noLoginPages.find((p) => p === pathname)) {
    return NextResponse.next();
  }

  const { token } = req.cookies;
  if (!token) {
    return redirectToSigning(origin);
  }

  try {
    validateToken(token); // doesn't work with next 12.1.6
  } catch (error) {
    return redirectToSigning(origin);
  }
};

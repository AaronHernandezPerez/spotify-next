/* Edge functions middleware, happens on the network layer */
import { NextRequest, NextResponse } from "next/server";

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
};

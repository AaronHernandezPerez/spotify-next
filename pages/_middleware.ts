/* Edge functions middleware, happens on the network layer */
import { NextRequest, NextResponse } from "next/server";

const noLoginPages = ["/signin", "/signup", "/api/signin", "/api/signup"];

export default (req: NextRequest) => {
  const { pathname, origin } = req.nextUrl;
  if (noLoginPages.find((p) => p === pathname)) {
    return;
  }

  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return NextResponse.redirect(`${origin}/signin`);
  }
};

import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { jwtSign } from "../../lib/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "User doesn't exists" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: "Invalid password" });
  }

  const token = jwtSign(user);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
  );

  return res.json(user);
};

import bcrypt from "bcrypt";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { jwtSign } from "../../lib/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const salt = bcrypt.genSaltSync();
  const { firstName, lastName, email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "User already exists" });
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

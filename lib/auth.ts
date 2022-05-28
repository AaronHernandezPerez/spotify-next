import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

const throwAuthError = (res: NextApiResponse) => {
  res.status(401).json({ error: "Not Authorized" });
};

type validateRouteHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  user: User
) => unknown | Promise<unknown>;

interface JwtFields {
  id: number;
  email: string;
  time: number;
}

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.SECRET) as JwtPayload & JwtFields;
  return user;
};

export const validateRoute = (handler: validateRouteHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { token } = req.cookies;
    if (!token) {
      throwAuthError(res);
    }

    try {
      const { id } = validateToken(token);
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error("Not a real user");
      }

      return handler(req, res, user);
    } catch (error) {
      throwAuthError(res);
    }
  };
};

export const jwtSign = (user: User) => {
  const jwtFields: JwtFields = {
    email: user.email,
    id: user.id,
    time: Date.now(),
  };

  return jwt.sign(jwtFields, process.env.SECRET, { expiresIn: "24h" });
};

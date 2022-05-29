import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { validateToken } from "./jwt";
import prisma from "./prisma";

const throwAuthError = (res: NextApiResponse) => {
  res.status(401).json({ error: "Not Authorized" });
};

type validateRouteHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  user: User
) => unknown | Promise<unknown>;

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

import { User } from "@prisma/client";
import { verify, sign, JwtPayload } from "jsonwebtoken";

interface JwtFields {
  id: number;
  email: string;
  time: number;
}

export const validateToken = (token) => {
  const user = verify(token, process.env.SECRET) as JwtPayload & JwtFields;
  return user;
};

export const jwtSign = (user: User) => {
  const jwtFields: JwtFields = {
    email: user.email,
    id: user.id,
    time: Date.now(),
  };

  return sign(jwtFields, process.env.SECRET, { expiresIn: "24h" });
};

import { PrismaClient } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";

const prisma = new PrismaClient();

export const createUser = async ({ name, username }: {
  name: string;
  username: string;
}) => {
  return prisma.user.create({
    data: {
      name,
      username,
    },
  });
};

export const createJWT = (user: { id: string; username: string }, jti: string) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
      issuer: process.env.JWT_ISSUER,
      jwtid: jti,
    } as SignOptions
  );
};

export const createRefreshToken = (user: { id: string; username: string }, jti: string) => {
  return jwt.sign(
    { userId: user.id, username: user.username },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRES,
      issuer: process.env.JWT_ISSUER,
      jwtid: jti,
    } as SignOptions
  );
};

export const serializeUser = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    createdAt: user.createdAt,
  };
};

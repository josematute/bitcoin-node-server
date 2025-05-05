import { PrismaClient } from "@prisma/client";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserCreationParams } from "./models/auth-models";

const prisma = new PrismaClient();

export const createUser = async ({ name, username, email, password }: UserCreationParams) => {
  // Hash the password before storing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });
};

export const createJWT = (user: { id: string; username: string; email: string }, jti: string) => {
  return jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
      issuer: process.env.JWT_ISSUER,
      jwtid: jti,
    } as SignOptions
  );
};

export const createRefreshToken = (user: { id: string; username: string; email: string }, jti: string) => {
  return jwt.sign(
    { userId: user.id, username: user.username, email: user.email },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRES,
      issuer: process.env.JWT_ISSUER,
      jwtid: jti,
    } as SignOptions
  );
};

export const verifyPassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const serializeUser = (user: any) => {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
  };
};

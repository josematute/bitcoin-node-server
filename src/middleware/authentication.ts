import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { UnauthorizedError } from "../errors";
import AuthenticatedUser from "./models/authenticated-user";
import { Request } from "express";

const prisma = new PrismaClient();

export async function expressAuthentication(
  req: Request,
  securityName: string,
  _scopes?: string[]
): Promise<AuthenticatedUser> {
  console.log(`authentication middleware called, securityName: ${securityName}`);
  // grab the token out of the HTTP header
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const isBearer = authHeader.startsWith("Bearer ");

  if (!authHeader || !isBearer) {
    console.log("Unauthorized, no auth header or not a bearer token");
    throw new UnauthorizedError();
  }

  const token = authHeader.split(" ")[1];

  if (securityName == "jwt") {
    try {
      // do not ignore the expiration
      console.log("jwt authentication middleware called");
      return await jwtAuth(token, false);
    } catch (error) {
      console.log("Unauthorized, jwt authentication middleware failed");
      throw new UnauthorizedError();
    }
  } else if (securityName == "jwt_without_verification") {
    try {
      // ignore the expiration
      console.log("jwt_without_verification authentication middleware called");
      return await jwtAuth(token, true);
    } catch {
      console.log("Unauthorized, jwt_without_verification authentication middleware failed");
      throw new UnauthorizedError();
    }
  } else {
    throw new UnauthorizedError();
  }
}

async function jwtAuth(token: string, ignoreExpiration: boolean = false): Promise<AuthenticatedUser> {
  const decoded = jwt.verify(token, process.env.JWT_SECRET, {
    ignoreExpiration,
  }) as {
    userId: string;
    username: string;
    iss: string;
    jti: string;
  };

  const jti = decoded.jti;

  // make sure this JTI is not in the blacklist
  const blacklisted = await prisma.blacklist.findFirst({
    where: {
      object: jti,
      kind: "jti",
    },
  });

  if (blacklisted) {
    console.log("Unauthorized, jti is blacklisted");
    throw new UnauthorizedError();
  }

  const user: AuthenticatedUser = {
    id: decoded.userId,
    username: decoded.username,
    jti: jti,
    iss: decoded.iss,
  };

  console.log("jwt authentication middleware successful");

  return user;
}
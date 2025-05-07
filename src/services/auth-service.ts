import jwt from "jsonwebtoken";
import AuthenticatedUser from "src/middleware/models/authenticated-user";
import { LoginParams, RefreshParams, UserAndCredentials, UserCreationParams } from "./models/auth-models";
import {
  createUser,
  createJWT,
  createRefreshToken,
  serializeUser,
  verifyPassword
} from "./user-service";
import { PrismaClient } from "@prisma/client";
import { BadRequestError, UnauthorizedError } from "../errors";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export class AuthService {
  public async register(params: UserCreationParams): Promise<UserAndCredentials> {
    console.log(`AuthService.register called, name: ${params.name}, username: ${params.username}`);
    const user = await createUser(params);
    const jti = uuidv4();
    const token = createJWT(user, jti);
    const refresh = createRefreshToken(user, jti);

    return {
      user: serializeUser(user),
      token,
      refresh,
    };
  }

  public async login(params: LoginParams): Promise<UserAndCredentials> {
    console.log(`AuthService.login called, username: ${params.username}`);
    const user = await prisma.user.findUnique({
      where: {
        username: params.username,
      },
    });

    if (!user) {
      console.log("AuthService.login Unauthorized, user not found");
      throw new UnauthorizedError();
    }

    const isCorrectPassword = await verifyPassword(params.password, user.password);
    if (!isCorrectPassword) {
      console.log("AuthService.login Unauthorized, password is incorrect");
      throw new UnauthorizedError();
    }

    const jti = uuidv4();
    const token = createJWT(user, jti);
    const refresh = createRefreshToken(user, jti);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      token,
      refresh,
    };
  }

  public async refresh(
    params: RefreshParams,
    user: AuthenticatedUser
  ): Promise<UserAndCredentials> {
    console.log(`AuthService.refresh called, params: ${JSON.stringify(params)}, user: ${JSON.stringify(user)}`);
    const decodedRefreshToken = jwt.verify(
      params.refreshToken,
      process.env.REFRESH_SECRET
    ) as {
      userId: string;
      username: string;
      iss: string;
      jti: string;
    };

    console.log("decodedRefreshToken", decodedRefreshToken);
    console.log("user", user);

    if (
      decodedRefreshToken.iss === process.env.JWT_ISSUER &&
      decodedRefreshToken.userId === user.id &&
      decodedRefreshToken.username === user.username &&
      decodedRefreshToken.iss === user.iss &&
      decodedRefreshToken.jti === user.jti
    ) {
      // make sure the refresh token is not blacklisted
      const blacklisted = await prisma.blacklist.findFirst({
        where: {
          object: decodedRefreshToken.jti,
          kind: "jti",
        },
      });

      console.log("blacklisted", blacklisted);
      if (blacklisted) {
        console.log("Unauthorized, jwt is blacklisted");
        throw new UnauthorizedError();
      }

      // blacklist the given refresh token
      await prisma.blacklist.create({
        data: {
          object: decodedRefreshToken.jti,
          kind: "jti"
        }
      });

      const user = await prisma.user.findUnique({
        where: {
          id: decodedRefreshToken.userId,
          username: decodedRefreshToken.username
        },
      });

      if (!user) {
        console.log("Unauthorized, user not found");
        throw new BadRequestError();
      }

      const newJti = uuidv4();
      const newToken = createJWT(user, newJti);
      const newRefresh = createRefreshToken(user, newJti);

      console.log("created new token and refresh token");

      return {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
        token: newToken,
        refresh: newRefresh,
      };
    } else {
      console.log("Unauthorized");
      throw new UnauthorizedError();
    }
  }
}

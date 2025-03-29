import jwt from "jsonwebtoken";
import AuthenticatedUser from "src/middleware/models/authenticated-user";
import { RefreshParams, UserAndCredentials } from "./models/auth-models";
import {
  createUser,
  createJWT,
  createRefreshToken,
  serializeUser,
} from "./user-service";
import { PrismaClient } from "@prisma/client";
import { BadRequestError, UnauthorizedError } from "../errors";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();

export class AuthService {
  async register({ name, username }: { name: string; username: string }) {
    const user = await createUser({ name, username });
    const jti = uuidv4();
    const token = createJWT(user, jti);
    const refresh = createRefreshToken(user, jti);

    return {
      user: serializeUser(user),
      token,
      refresh,
    };
  }

  public async refresh(
    params: RefreshParams,
    user: AuthenticatedUser
  ): Promise<UserAndCredentials> {
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
        throw new BadRequestError();
      }

      const newJti = uuidv4();
      const newToken = createJWT(user, newJti);
      const newRefresh = createRefreshToken(user, newJti);

      return {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
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

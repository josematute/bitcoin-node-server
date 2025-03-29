import {
  createUser,
  createJWT,
  createRefreshToken,
  serializeUser,
} from "./user-service";

export class AuthService {
  async register({ name, username }: { name: string; username: string }) {
    const user = await createUser({ name, username });
    const token = createJWT(user);
    const refresh = createRefreshToken(user);

    return {
      user: serializeUser(user),
      token,
      refresh,
    };
  }
}

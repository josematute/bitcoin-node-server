export default interface AuthenticatedUser {
  id: string;
  jti: string;
  iss: string;
  username: string;
}
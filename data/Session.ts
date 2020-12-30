import jwt from "jsonwebtoken";
import { IUser, IUserSession, IUserSessionPayload } from "../types/User";
import { getFullName } from "./User";

const secret = process.env.JWT_SECRET;

export function createSession(user: IUser): IUserSession {
  const email = user.email;
  const username = getFullName(user);
  const payload: IUserSessionPayload = {
    email,
    username,
  };

  const accessToken = jwt.sign(payload, secret, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, secret, { expiresIn: "30d" });
  return {
    email,
    username,
    accessToken,
    refreshToken,
  };
}

export function getSession(
  accessToken: string,
  refreshToken: string
): IUserSession | undefined {
  const payload = validateToken(accessToken);
  if (payload) {
    const newPayload: IUserSessionPayload = {
      email: payload.email,
      username: payload.username,
    };

    const accessToken = jwt.sign(newPayload, secret, { expiresIn: "1h" });
    return {
      email: payload.email,
      username: payload.username,
      accessToken,
      refreshToken,
    };
  }
}

export function refreshSession(refreshToken: string): IUserSession | undefined {
  const payload = validateToken(refreshToken);
  if (payload) {
    const newPayload: IUserSessionPayload = {
      email: payload.email,
      username: payload.username,
    };

    const accessToken = jwt.sign(newPayload, secret, { expiresIn: "1h" });
    return {
      email: payload.email,
      username: payload.username,
      accessToken,
      refreshToken,
    };
  }
}

export function validateToken(token: string): IUserSessionPayload | undefined {
  try {
    return jwt.verify(token, secret) as IUserSessionPayload;
  } catch (err) {
    return undefined;
  }
}

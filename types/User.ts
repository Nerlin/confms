export interface IUser {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
}

export interface IUserSession {
  id?: number;
  email?: string;
  username?: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUserSessionPayload {
  username: string;
  email: string;
}
import { IUser } from "../types/User";

const salt = process.env.SALT || "$2b$10$FiM0l6/MwSvTr960BzyfZ.";

export function getFullName(user: IUser): string {
  let fullName = [user.firstName, user.lastName].filter(part => part).join(" ");
  if (!fullName) {
    fullName = user.email;
  }
  return fullName;
}

export async function hashPassword(password: string): Promise<string> {
  const bcrypt = await import("bcrypt");
  return await bcrypt.hash(password, salt);
}

export async function comparePasswords(
  password: string,
  hash: string
): Promise<boolean> {
  const bcrypt = await import("bcrypt");
  return await bcrypt.compare(password, hash);
}

export function validateEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

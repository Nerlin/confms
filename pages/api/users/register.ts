import { NextApiRequest, NextApiResponse } from "next";
import { serializeCookie } from "../../../data/Cookie";
import { ensureConnection } from "../../../data/Database";
import { SessionSchema } from "../../../data/entities/Session";
import { UserSchema } from "../../../data/entities/User";
import { createSession } from "../../../data/Session";
import { hashPassword, validateEmail } from "../../../data/User";
import { IUser, IUserSession } from "../../../types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);
  const email = data.email;
  if (!email) {
    return res.status(400).send("Введите email.");
  }

  if (!validateEmail(email)) {
    return res.status(400).send(`${email} не является корректным email.`);
  }

  const password = data.password;
  if (!password) {
    return res.status(400).send("Введите пароль.");
  }

  const connection = await ensureConnection();
  const users = await connection.getRepository<IUser>(UserSchema);

  const registered = await users.findOne({ where: { email } });
  if (registered) {
    return res
      .status(400)
      .send("Пользователь с данным email уже зарегистрирован.");
  }

  const hashedPassword = await hashPassword(password);
  const user: IUser = {
    email,
    password: hashedPassword,
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
  };

  await users.save(user);

  const session = createSession(user);
  const sessions = await connection.getRepository<IUserSession>(SessionSchema);
  await sessions.save(session);

  res.setHeader("Set-Cookie", serializeCookie("Session", session));
  res.status(201).json(session);
}

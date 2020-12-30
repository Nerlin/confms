import { NextApiRequest, NextApiResponse } from "next";
import { ensureConnection } from "../../../data/Database";
import { serializeCookie } from "../../../data/Cookie";
import { SessionSchema } from "../../../data/entities/Session";
import { UserSchema } from "../../../data/entities/User";
import { createSession } from "../../../data/Session";
import { hashPassword } from "../../../data/User";
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

  const password = data.password;
  if (!password) {
    return res.status(400).send("Введите пароль.");
  }

  const hashedPassword = await hashPassword(password);
  const connection = await ensureConnection();
  const users = await connection.getRepository<IUser>(UserSchema);
  const user = await users.findOne({
    where: { email, password: hashedPassword },
  });

  if (user) {
    const session = createSession(user);
    const sessions = await connection.getRepository<IUserSession>(SessionSchema);
    await sessions.save(session);

    res.setHeader("Set-Cookie", serializeCookie("Session", session));
    return res.status(200).json(session);
  } else {
    return res
      .status(400)
      .send(
        "Данные для входа неверны или такой пользователь не зарегистрирован."
      );
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, serializeCookie } from "../../../data/Cookie";
import { ensureConnection } from "../../../data/Database";
import { SessionSchema } from "../../../data/entities/Session";
import { refreshSession, validateToken } from "../../../data/Session";
import { IUserSession } from "../../../types/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let session: IUserSession;
  if (req.body) {
    session = JSON.parse(req.body);
  } else {
    const cookies = (req.headers["cookie"] as string) ?? "";
    session = getCookie<IUserSession>(cookies, "Session");
  }

  if (session && validateToken(session.refreshToken)) {
    session = refreshSession(session.refreshToken);
    if (session) {
      const connection = await ensureConnection();
      const sessions = await connection.getRepository<IUserSession>(
        SessionSchema
      );
      const storedSession = await sessions.findOne({
        where: { refreshToken: session.refreshToken },
      });
      if (storedSession) {
        res.setHeader("Session", serializeCookie("Session", session));
        return res.status(200).json(session);
      }
    }
  }
  return res.status(401).send("Сессия истекла.");
}

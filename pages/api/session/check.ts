import { NextApiRequest, NextApiResponse } from "next";
import { getCookie, serializeCookie } from "../../../data/Cookie";
import { getSession, validateToken } from "../../../data/Session";
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

  if (session && validateToken(session.accessToken)) {
    session = getSession(session.accessToken, session.refreshToken);
    if (session) {
      res.setHeader("Set-Cookie", serializeCookie("Session", session));
      return res.status(200).json(session);
    }
  }
  return res.status(401).send("Токен доступа истек.");
}

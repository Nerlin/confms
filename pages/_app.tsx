import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { IncomingMessage, ServerResponse } from "http";
import App, { AppContext } from "next/app";
import "reflect-metadata";
import "tailwindcss/tailwind.css";
import SessionProvider from "../components/SessionProvider";
import { getCookie, serializeCookie } from "../data/Cookie";
import "../styles/global.css";
import { IUserSession } from "../types/User";

config.autoAddCss = false;

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const props = await App.getInitialProps(context);

  let session;
  if (context.ctx.req) {
    session = await getServerSession(context.ctx.req, context.ctx.res);
  } else {
    session = await getClientSession();
  }

  return {
    ...props,
    session,
  };
};

async function getServerSession(
  req: IncomingMessage,
  res: ServerResponse
): Promise<IUserSession | undefined> {
  let session = getCookie<IUserSession>(
    req.headers["cookie"] as string,
    "Session"
  );
  if (session) {
    session = await fetchSession(session);
    res.setHeader("Set-Cookie", serializeCookie("Session", session));
  }
  return session;
}

async function getClientSession(): Promise<IUserSession | undefined> {
  let session = getCookie<IUserSession>(document.cookie, "Session");
  if (session) {
    session = await fetchSession();
    document.cookie = serializeCookie("Session", session);
  }
  return session;
}

async function fetchSession(session?: IUserSession): Promise<IUserSession | undefined> {
  let result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/session/check`, {
    method: "POST",
    credentials: "include",
    body: session ? JSON.stringify(session) : undefined
  });
  if (result.status === 200) {
    return await result.json();
  }

  if (result.status === 401) {
    result = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/session/refresh`, {
      method: "POST",
      credentials: "include",
      body: session ? JSON.stringify(session) : undefined
    });
    if (result.status === 200) {
      return await result.json();
    }
  }
}

export default MyApp;

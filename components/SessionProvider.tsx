import React from "react";
import { IUserSession } from "../types/User";

export const SessionContext = React.createContext<IUserSession | undefined>(
  undefined
);

export interface SessionProviderProps {
  session: IUserSession;
  children?: React.ReactNode;
}

export default function SessionProvider({
  session,
  children,
}: SessionProviderProps) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

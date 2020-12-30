import { useContext } from "react";
import { SessionContext } from "../components/SessionProvider";

export default function useSession() {
  return useContext(SessionContext);
}

import { GetServerSideProps } from "next";
import { removeCookie } from "../data/Cookie";

export default function LogOut() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader("Set-Cookie", removeCookie("Session"));
  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

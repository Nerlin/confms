import Link from "next/link";
import useSession from "../hooks/useSession";

export default function Header() {
  const session = useSession();
  return (
    <header className={"p-3 border-b border-gray-200 text-sm"}>
      <nav className={"flex flex-initial items-center"}>
        <div className={"text-3xl font-serif"}>
          <Link href={"/"}>
            <a>Конф.ру</a>
          </Link>
        </div>
        <ul className={"flex space-x-6 ml-auto items-center"}>
          {session ? (
            <>
              <li>
                {session.email}
              </li>
              <li>
                <Link href={"/logout"}>
                  <a href={"/logout"}>Выйти</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={"/login"}>
                  <a>Войти</a>
                </Link>
              </li>
              <li>
                <Link href={"/register"}>
                  <a className={"rounded-md px-4 py-2 text-white bg-green-600"}>
                    Участвовать
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

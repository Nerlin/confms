import Link from "next/link"

export default function Header() {
  return (
    <header className={"py-3 border-b border-gray-200"}>
      <nav className={"flex flex-initial items-center"}>
        <div className={"text-3xl font-serif"}>
          <Link href={"/"}>
            <a>Конф.ру</a>
          </Link>
        </div>
        <ul className={"flex space-x-4 ml-auto items-center"}>
          <li>
            <Link href={"/login"}>
              <a>Войти</a>
            </Link>
          </li>
          <li>
            <Link href={"/register"}>
              <a className={"rounded-md px-4 py-2 text-white bg-green-600"}>Участвовать</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
import Link from "next/link"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

export default function MenuItem({ icon, href, children }) {
  const { asPath } = useRouter()
  const active = href === asPath
  return (
    <li>
      <Link href={href}>
        <a href={href} className={classNames("inline-flex w-full items-center text-sm font-semibold p-2 pr-32 rounded transition-all", {
          "text-black bg-gray-100": active,
          "text-gray-700 hover:bg-gray-200": !active,
        })}>
          <FontAwesomeIcon className={"mr-3 text-gray-600"} icon={icon} fixedWidth size={"1x"} />
          <span>{children}</span>
        </a>
      </Link>
    </li>
  )
}
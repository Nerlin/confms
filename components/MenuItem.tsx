import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import Link from "next/link"
import { useRouter } from "next/router"

export interface MenuItemProps {
  icon: IconProp
  href: string
  children: React.ReactNode
}

export default function MenuItem({ icon, href, children }: MenuItemProps) {
  const { asPath } = useRouter();
  const active = href === asPath;
  return (
    <li>
      <Link href={href}>
        <a
          href={href}
          className={classNames(
            "inline-flex w-full items-center text-sm font-semibold p-2 pr-32 rounded transition-all",
            {
              "text-gray-800 bg-gray-100": active,
              "text-blue-500 hover:bg-gray-200": !active,
            }
          )}
        >
          <FontAwesomeIcon
            className={"mr-3"}
            icon={icon}
            fixedWidth
            size={"1x"}
          />
          <span>{children}</span>
        </a>
      </Link>
    </li>
  );
}
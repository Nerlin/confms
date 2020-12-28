import { faFileArchive, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ConferenceMembership({ slug }) {
  return (
    <aside className={"bg-white border border-gray-100 shadow-md ml-4 mt-4 min-w-max"}>
      <header>
        <ul>
          <li className={"font-semibold font-serif uppercase px-4 py-2 text-center"}>Участникам</li>
          <li className={"px-2 pr-16 py-2"}>
            <Link href={`/conferences/${slug}/info`}>
              <a className={"flex items-center"} href={`/conferences/${slug}/info`}>
                <FontAwesomeIcon className={"mr-2 text-2xl text-blue-600"} icon={faInfo} fixedWidth />
                <span className={"text-blue-600"}>Сведения</span>
              </a>
            </Link>
          </li>
          <li className={"px-2 pr-16 py-2"}>
            <Link href={`/conferences/${slug}/materials`}>
              <a className={"flex items-center"} href={`/conferences/${slug}/materials`}>
                <FontAwesomeIcon className={"mr-2 text-2xl text-blue-600"} icon={faFileArchive} fixedWidth />
                <span className={"text-blue-600"}>Материалы</span>
              </a>
            </Link>
          </li>
        </ul>
      </header>
    </aside>
  )
}
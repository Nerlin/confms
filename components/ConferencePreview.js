import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ConferencePreview({ conference: { slug, name, date, shortDescription }}) {
  return (
    <div className={"flex flex-col py-2"}>
      <Link href={`/conferences/${slug}`}>
        <h2 className={"text-2xl font-serif"}>
          <a href={`/conferences/${slug}`}>{name}</a>
        </h2>
      </Link>
      
      <time className={"text-gray-500"} dateTime={date}>
        {date}
      </time>

      <div className={"my-1 leading-normal"}>
        {shortDescription}
      </div>

      <div className={"my-1"}>
        <Link href={`/conferences/${slug}`}>
          <a className={"text-blue-600 align-middle"} href={`/conferences/${slug}`}>
            Подробнее
            <FontAwesomeIcon icon={faChevronRight} className={"inline-block ml-2 w-2"} />
          </a>
        </Link>
      </div>
    </div>
  )
}
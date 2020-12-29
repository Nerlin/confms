import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Date from "./Date";
import { Conference } from "../types/Conference"

export interface ConferencePreviewProps {
  conference: Conference
}

export default function ConferencePreview({
  conference: { slug, name, date, shortDescription },
}: ConferencePreviewProps) {
  return (
    <div className={"flex flex-col py-2"}>
      <Link href={`/conferences/${slug}`}>
        <h2 className={"text-2xl font-serif"}>
          <a href={`/conferences/${slug}`}>{name}</a>
        </h2>
      </Link>

      <Date dateString={date} />

      <div className={"my-1 leading-normal"}>{shortDescription}</div>

      <div className={"my-1"}>
        <Link href={`/conferences/${slug}`}>
          <a
            className={"text-blue-600 align-middle text-sm"}
            href={`/conferences/${slug}`}
          >
            Подробнее
            <FontAwesomeIcon
              icon={faChevronRight}
              className={"inline-block ml-2 w-2"}
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
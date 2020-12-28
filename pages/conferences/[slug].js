import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import ConferenceMembership from "../../components/ConferenceMembership";
import Layout from "../../components/Layout";
import { getConferenceBySlug, getConferences } from "../../data/conferences";

export default function ConferenceIndex({ conference }) {
  return (
    <Layout>
      <Head>
        <title>{conference.name}</title>
      </Head>

      <section className={"my-10 flex items-start"}>
        <article>
          <h1 className={"text-4xl my-4 font-serif"}>{conference.name}</h1>
          {conference.shortDescription}
        </article>

        <ConferenceMembership slug={conference.slug} />
      </section>

      <Link href={"/"}>
        <a className={"text-blue-600"}>
          <FontAwesomeIcon icon={faChevronLeft} className={"mr-4"} />
          Назад к списку
        </a>
      </Link>
    </Layout>
  )
}

export async function getStaticPaths() {
  const conferences = await getConferences()
  return {
    paths: conferences.map(conference => {
      return {
        params: { slug: conference.slug }
      }
    }),
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const conference = await getConferenceBySlug(params.slug)
  return {
    props: {
      conference
    }
  }
}
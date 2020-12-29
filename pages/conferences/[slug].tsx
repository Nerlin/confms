import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import ConferenceMembership from "../../components/ConferenceMembership";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import { getConferenceBySlug, getConferences } from "../../data/conferences";
import { Conference } from "../../types/Conference";

interface ConferenceIndexProps {
  conference: Conference
}

export default function ConferenceIndex({ conference }: ConferenceIndexProps) {
  return (
    <Layout>
      <Head>
        <title>{conference.name}</title>
      </Head>

      <section className={"my-10"}>
        <article>
          <h1 className={"text-4xl my-4 font-serif"}>{conference.name}</h1>
          <Date dateString={conference.date} />
          
          <div className={"flex md:flex-row sm:flex-col-reverse items-start"}>
            <p className={"my-4 mr-4"}>
              {conference.shortDescription}

              <Link href={"/"}>
                <a className={"block my-4 text-sm text-blue-600"}>
                  <FontAwesomeIcon icon={faChevronLeft} className={"inline-block mr-4 w-2"} />
                  Назад к списку
                </a>
              </Link>
            </p>

            <ConferenceMembership slug={conference.slug} />
          </div>
          
        </article>
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
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

export const getStaticProps: GetStaticProps<{ conference: Conference }, { slug: string }> = async ({ params }) => {
  const conference = await getConferenceBySlug(params.slug)
  return {
    props: {
      conference
    }
  }
}
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import ConferenceMembership from "../../components/ConferenceMembership";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import { ensureConnection } from "../../data/Database";
import { ConferenceSchema } from "../../data/entities/Conferences";
import { IConference } from "../../types/Conference";

interface ConferenceIndexProps {
  conference: IConference;
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
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={"inline-block mr-4 w-2"}
                  />
                  Назад к списку
                </a>
              </Link>
            </p>

            <ConferenceMembership slug={conference.slug} />
          </div>
        </article>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  { conference: IConference },
  { slug: string }
> = async ({ params }) => {
  const connection = await ensureConnection();
  const repository = await connection.getRepository<IConference>(
    ConferenceSchema
  );
  const conference = await repository.findOne({ slug: params.slug });
  if (conference) {
    return {
      props: {
        conference,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};

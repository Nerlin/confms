import { GetServerSideProps } from "next";
import Head from "next/head";
import ConferencePreview from "../components/ConferencePreview";
import Layout from "../components/Layout";
import { ensureConnection } from "../data/Database";
import { ConferenceSchema } from "../data/entities/Conferences";
import { IConference } from "../types/Conference";

export interface HomeProps {
  conferences: IConference[];
}

export default function Home({ conferences }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Конф.ру</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={"my-4 flex flex-col divide-y space-y-4"}>
        {conferences.map((conference) => (
          <ConferencePreview key={conference.id} conference={conference} />
        ))}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const connection = await ensureConnection();
  const repository = await connection.getRepository<IConference>(
    ConferenceSchema
  );
  const conferences = await repository.find();
  return {
    props: {
      conferences,
    },
  };
};

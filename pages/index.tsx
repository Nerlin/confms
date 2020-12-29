import { GetStaticProps } from 'next'
import Head from 'next/head'
import ConferencePreview from '../components/ConferencePreview'
import Layout from '../components/Layout'
import { getConferences } from '../data/conferences'
import { Conference } from '../types/Conference'

export interface HomeProps {
  conferences: Conference[]
}

export default function Home({ conferences }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Conferences</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={"my-4 flex flex-col divide-y space-y-4"}>
        {conferences.map(conference => 
          <ConferencePreview key={conference.id} conference={conference} />
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const conferences = await getConferences();
  return {
    props: {
      conferences
    }
  }
}
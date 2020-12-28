import Head from 'next/head'
import ConferencePreview from '../components/ConferencePreview'
import Layout from '../components/Layout'
import { getConferences } from '../data/conferences'

export default function Home({ conferences }) {
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

export async function getStaticProps() {
  const conferences = await getConferences();
  return {
    props: {
      conferences
    }
  }
}
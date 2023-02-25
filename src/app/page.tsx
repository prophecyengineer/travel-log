import Image from 'next/image'
import { TravelLogs } from '@/models/TravelLogs'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import TravelLogForm from '@/components/TravelLogForm'
import dynamic from 'next/dynamic'
import TravelLogMap from '@/components/TravelLogMap'

// const TravelLogMap = dynamic(import('@/components/TravelLogMap'), {
//   ssr: false,
//   // loading: LoadingSpinner,
// });

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  // prior this waqs done as getServerSideProps
  const logs = await TravelLogs.find().toArray();
  return (

    <>
      <TravelLogMap logs={logs} />
      <main data-theme='acid' className={styles.main}>
        <h2 className='badge badge-lg badge-primary absolute top-4'>There are {logs.length} travels in the database</h2>
        <TravelLogForm />


      </main>
    </>
  )
}

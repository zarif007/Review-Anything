import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { theme } from '../atoms/themeAtom'
import BottomNav from '../components/BottomNav'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PostModal from '../components/PostModal'


const Home: NextPage = () => {

  const [isDark] = useRecoilState(theme);

  const styles = {
    wrapper: `min-h-screen ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}`,
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>RAT</title>
        <meta name="description" content="Review Anything" />
        <link rel="icon" href="/sm_logo.ico" />
      </Head>
      <Header />

        {/* 
        Dark => 
          BG -> #0E0E10
          POST -> #131313
          SHADOW -> black
          border -> bg-gray-900

        Lite => 
          BG -> #F5F5F5
          POST -> #FFFAFA
          Shadow -> #a1a1aa
        */}

      <div className='overflow-hidden'>
        <Feed />
      </div>
      <div className='inline md:hidden'>
        <BottomNav />
      </div>
      <PostModal />
    </div>
  )
}

export default Home

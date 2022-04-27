import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { theme } from '../atoms/themeAtom'
import BottomNav from '../components/BottomNav'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PoolModal from '../components/modals/PoolModal'
import PostModal from '../components/modals/PostModal'
import { postsState } from './../atoms/postsAtom';
import { useEffect } from 'react';


export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/posts');

  return {
    props: { 
      data,
     },
  };
};


const Home: NextPage = ({ data }: any) => {

  const [isDark] = useRecoilState(theme);

  const [posts, setPosts] = useRecoilState(postsState);

  useEffect(() => {
    setPosts(data.data);

    console.log(posts);


  }, [data])
  
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
      <PoolModal />
    </div>
  )
}

export default Home

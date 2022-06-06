import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import { useRecoilState } from 'recoil'
import { theme } from '../atoms/themeAtom'
import BottomNav from '../components/BottomNav'
import Feed from '../components/Feed'
import Header from '../components/Header'
import HeaderTags from '../components/HeaderTags'
import PoolModal from '../components/modals/PoolModal'
import PostModal from '../components/modals/PostModal'
import NotificationModal from '../components/modals/NotificationModal'
import { domain } from '../domain'
import TrendingModal from '../components/modals/TrendingModal'

let dk = false;
export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(`${domain}posts`);

  return {
    props: { 
      data,
     },
  };
};


const Home: NextPage = ({ data }: any ) => {

  const [isDark] = useRecoilState<boolean>(theme);
  dk = isDark;

  const styles = {
    wrapper: `min-h-screen ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}`,
  }

  return (
    <div className={styles.wrapper}>

      <HeaderTags title='RAT' content='Review Anything' />

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
        <Feed posts={data.data} />
      </div>
      <div className='inline md:hidden'>
        <BottomNav />
      </div>
      <PostModal />
      <PoolModal />
      <NotificationModal />
      <TrendingModal />
    </div>
  )
}

export default Home

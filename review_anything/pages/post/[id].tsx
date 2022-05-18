import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil';
import { theme } from '../../atoms/themeAtom';
import Comments from '../../components/Comments';
import Header from '../../components/Header';
import HeaderTags from '../../components/HeaderTags';
import PostModal from '../../components/modals/PostModal';
import Post from '../../components/Post';
import postInterface from '../../interfaces/Post';
import { domain } from './../../domain';


export const getServerSideProps: GetServerSideProps = async ( { params } ) => {

  const { data } = await axios.get(`${domain}posts/${params?.id}`);

  return {
    props: { 
      post: data.data,
     },
  };
};


const postDetails: React.FC<{ post: postInterface }> = ( { post } ) => {
  
  const [isDark] = useRecoilState<boolean>(theme);
  
  const { query: { id } } = useRouter();

  const styles = {
    wrapper: `min-h-screen ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}`,
  }

  return (
    <div className={styles.wrapper}>

      <HeaderTags title={post.title} content={post.review} />

      <Header />

      <main className='text-white flex mx-auto max-w-6xl justify-around items-stretch flex-col md:flex-row'>
        <section className='sm:w-full md:w-4/6'> 
          <Post post={post} />
        </section>
        <section className='flex w-full md:w-2/6 pt-6 flex-col'>
          <Comments />
        </section>
      </main>

      <PostModal />
    </div>
  )
}

export default postDetails

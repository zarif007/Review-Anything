import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil';
import { theme } from '../../atoms/themeAtom';
import Header from '../../components/Header';
import HeaderTags from '../../components/HeaderTags';
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

      <div className='flex mx-auto max-w-3xl justify-around flex-col'>
        <div className='w-full'>
          <Post post={post} />
        </div>
        <h1>comments</h1>
      </div>
    </div>
  )
}

export default postDetails

import React, { useEffect, useState } from 'react'
import postInterface from '../interfaces/Post'
import { BiTrendingUp } from "react-icons/bi";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { BsFillStarFill } from 'react-icons/bs';
import { theme } from '../atoms/themeAtom';
import { useRecoilState } from 'recoil';


const Trending = () => {

  const [isDark, setIsDark] = useRecoilState(theme);

  const styles = {
      wrapper: `border-2 ${isDark ? 'border-gray-900 text-gray-300' : 'border-gray-200 text-gray-800'} mr-2`,
      trendingText: `font-bold text-2xl p-2`,
      trendingIcon: `h-10 w-6 sm:h-12 sm:w-8 ${isDark ? 'text-gray-200' : 'text-gray-800'} iconAnimation pt-1`,
      postWrapper: `flex flex-wrap space-x-2 items-centre m-2`,
      postImg: `h-10 w-10 sm:h-12 sm:w-12 p-2 rounded-full cursor-pointer pt-2`,
      postDetailesWrapper: `flex flex-col`,
      genre: `bg-blue-500 hover:bg-blue-600 p-2 m-1 mt-0 rounded-2xl font-semibold text-xs iconAnimation hover:text-white text-white`,
  }

  const [posts, setPosts] = useState<postInterface[]>([]);

  useEffect(() => 
    onSnapshot(
      query(collection(db, 'posts'), 
      orderBy('timestamp', 'desc')), 
      snapshot => {
        let arr: any = [];
        snapshot.docs.map(sp => {
          arr.push(sp.data());
        })
        setPosts(arr);
      }), 
  [db]);

  return (
    <div className={styles.wrapper}>
      <div className='flex'>
        <p className={styles.trendingText}>Trending</p> 
        <BiTrendingUp className={styles.trendingIcon} />  
      </div>
      <div className='mb-8'>
        {
            posts.slice(0, 3).map((post: postInterface) => {
                return (
                    <div className={styles.postWrapper} key={post.id}>
                        <img src={post.img} className={styles.postImg} />
                        <div className={styles.postDetailesWrapper}>
                            <p className='font-semibold text-lg text-blue-400'>{post.title}</p>
                            <div className='flex space-x-3 items-center pt-1 flex-wrap font-semibold'>
                                <div className='flex space-x-1'>
                                    <p>{post.rating} </p>
                                    <BsFillStarFill className='text-yellow-500 h-6' />
                                </div>
                                <div className={styles.genre}>
                                    {post.genre}
                                </div>
                                <p>{post.review.slice(0, 18)}...</p>
                            </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
      
    </div>
  )
}

export default Trending

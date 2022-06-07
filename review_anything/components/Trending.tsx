import React, { useEffect, useState } from 'react'
import postInterface from '../interfaces/Post'
import { BiTrendingUp } from "react-icons/bi";
import { BsFillStarFill } from 'react-icons/bs';
import { theme } from '../atoms/themeAtom';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client'
import axios from 'axios';
import { domain } from '../domain';
import Link from 'next/link';

let socket: any;

const Trending: React.FC = () => {

  const [posts, setPosts] = useState<postInterface[]>([]);

  const getTrending = () => {
    axios.get(`${domain}/trending`)
      .then(res => {
        setPosts(res.data.data);
      });
  }
  
  useEffect(() => {
    socketInitializer();
    getTrending()
  }, [])


  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('update-input', (msg: any) => {
      const up: postInterface[] = msg;
      setPosts(up);
    })
  }

    
  const [isDark] = useRecoilState(theme);

  const styles = {
      wrapper: `border-2 ${isDark ? 'border-gray-900 text-gray-300' : 'border-gray-200 text-gray-800'} mr-2`,
      trendingText: `font-bold text-2xl p-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`,
      trendingIcon: `h-10 w-6 sm:h-12 sm:w-8 ${isDark ? 'text-gray-200' : 'text-gray-800'} iconAnimation pt-1`,
      postWrapper: `flex flex-col p-2 pb-1`,
      postImg: `h-10 w-10 sm:h-12 sm:w-12 sm:h-14 sm:w-14  p-2 rounded-full pt-2 object-contain`,
      postTitle: `font-semibold ${isDark ? 'text-blue-600' : 'text-blue-700'} text-lg lg:text-2xl uppercase`,
      postDetailesWrapper: `flex items-center space-x-1 lg:space-x-3 font-semibold md:text-xs lg:text-sm`,
      genre: `bg-blue-500 hover:bg-blue-600 p-2 m-1 mt-0 rounded-2xl font-semibold text-xs iconAnimation hover:text-white text-white`,
  }


  return (
    <div className={styles.wrapper}>
      <div className='flex'>
        <p className={styles.trendingText}>Trending</p>
        <BiTrendingUp className={styles.trendingIcon} />
      </div>
      <div className='mb-8'>
        { 
          !socket ? <>Loading...</> : 
          posts.slice(0, 3).map((post: postInterface, index) => {
            return (
              <div className={styles.postWrapper} key={index}>
                <Link href={`/post/${post._id}`}>
                  <div className='flex space-x-2 items-center pb-2 cursor-pointer'>
                    <img src={post.img} className={styles.postImg} />
                    <p className={styles.postTitle}>{post.title}</p>
                  </div>
                </Link>
                <div className={styles.postDetailesWrapper}>
                  <div className={styles.genre}>{post.genre}</div>
                  <div className='flex space-x-0 lg:space-x-1 items-center'>
                    <p className=''>{post.rating}</p>
                    <BsFillStarFill className='text-yellow-500 h-6' />
                  </div>
                  <p>{post.review.slice(0, 15)}...</p>
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
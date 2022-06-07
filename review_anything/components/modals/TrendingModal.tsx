import React, { Fragment, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react';
import { theme } from '../../atoms/themeAtom';
import { useRouter } from 'next/router';
import { domain } from '../../domain';
import { trendingModalState } from '../../atoms/trendingModalAtom';
import { BiTrendingUp } from 'react-icons/bi';
import postInterface from '../../interfaces/Post';
import axios from 'axios';
import io from 'socket.io-client'
import Link from 'next/link';
import { BsFillStarFill } from 'react-icons/bs';


let socket: any;

const TrendingModal = () => {

  const [open, setOpen] = useRecoilState<boolean>(trendingModalState);

  const [isDark] = useRecoilState(theme);

  const { data: session } = useSession();

  const router = useRouter();

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

  const styles = {
    wrapper: `flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-gray-800 opacity-75 transition-opacity`,
    postImgIcon: `rounded-full h-12 w-12 object-contain border ${isDark ? 'border-gray-800' : 'border-blue-100'} p-1 mr-3`,
    trendingWrapper: `inline-block align-bottom ${isDark ? 'bg-[#131313]' : 'bg-[#FFFAFA]'} rounded-lg px-4 pt-5 pb-4 text-left
      overflow-h           
      notificationidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
      sm:p-6 text-white `,
    trendingText: `font-semibold text-md ${isDark ? 'text-gray-100' : 'text-gray-800'}`,
    trendingIcon: `h-10 w-6 sm:h-12 sm:w-8 ${isDark ? 'text-gray-200' : 'text-gray-800'} iconAnimation pt-1`,
    postWrapper: `flex flex-col p-2 pb-1`,
    postImg: `h-10 w-10 sm:h-12 sm:w-12 sm:h-14 sm:w-14  p-2 rounded-full pt-2 object-contain`,
    postTitle: `font-semibold ${isDark ? 'text-blue-600' : 'text-blue-700'} text-lg lg:text-2xl uppercase`,
    postDetailesWrapper: `flex items-center space-x-1 lg:space-x-3 font-semibold md:text-xs lg:text-sm`,
    genre: `bg-blue-500 hover:bg-blue-600 p-2 m-1 mt-0 rounded-2xl font-semibold text-xs iconAnimation hover:text-white text-white`,
    postCaption: ``
    
  }

  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className='fixed mt-20 mb-20 md:mb-2 z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
      >
        <div className={styles.wrapper}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className={styles.dialogOverlay} />
          </Transition.Child>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >

            {/* Genre Upload Part   */}
            <div className={styles.trendingWrapper}>
              <div className='flex items-center justify-center'>
                <h1 className='font-bold text-lg text-blue-500 px-2 py-4'>Trending</h1>
                <BiTrendingUp className={styles.trendingIcon} />
              </div>
              <div className='mb-1'>
                { 
                  !socket ? <>Loading...</> : 
                  posts.slice(0, 3).map((post: postInterface) => {
                    return (
                      <div className={styles.postWrapper} key={post._id}>
                        <Link href={`/post/${post._id}`}>
                          <div className='flex space-x-2 items-center pb-2 cursor-pointer'>
                            <img src={post.img} className={styles.postImg} />
                            <p className={styles.postTitle}>{post.title}</p>
                          </div>
                        </Link>
                        <div className={styles.postDetailesWrapper}>
                          <div className={styles.genre}>{post.genre}</div>
                          <div className='flex space-x-0 lg:space-x-1 items-center'>
                            <p className={styles.trendingText}>{post.rating}</p>
                            <BsFillStarFill className='text-yellow-500 h-6' />
                          </div>
                          <p className={styles.trendingText}>{post.review.slice(0, 15)}...</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
       
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

  );
}

export default TrendingModal
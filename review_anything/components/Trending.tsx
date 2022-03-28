import React, { useEffect, useState } from 'react'
import postInterface from '../interfaces/Post'
import { BiTrendingUp } from "react-icons/bi";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { BsFillStarFill } from 'react-icons/bs';


const posts: any  = [
    {
        id: '1',
        userName: 'AKA',
        userImg: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',
        img: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',
        caption: 'kire?'
    },
    {
        id: '2',
        userName: 'llll',
        userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        caption: 'kirdadasdase?'
    },
    {
        id: '3',
        userName: 'dsadasd',
        userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        caption: 'kirdsaddsadsadsadasdasd d dsa dsadasd dsad dasd d adasdasdasdsad  ? '
    },
    {
        id: '4',
        userName: 'dsadasd',
        userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        caption: 'kirdsaddsadsadsadasdasd d dsa dsadasd dsad dasd d adasdasdasdsad  ? '
    },
    {
        id: '5',
        userName: 'dsadasd',
        userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
        caption: 'kirdsaddsadsadsadasdasd d dsa dsadasd dsad dasd d adasdasdasdsad  ? '
    },
]

const Trending = () => {



  const styles = {
      wrapper: 'border-2 border-gray-900 text-gray-300 mr-2',
      trendingText: 'font-bold text-2xl p-2',
      trendingIcon: 'h-10 w-6 sm:h-12 sm:w-8 text-gray-200 iconAnimation pt-1',
      postWrapper: 'flex flex-wrap space-x-2 items-centre m-2',
      postImg: 'h-10 w-10 sm:h-12 sm:w-12 p-2 rounded-full cursor-pointer pt-2',
      postDetailesWrapper: 'flex flex-col',
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
                            <p className='font-semibold text-lg'>{post.title}</p>
                            <div className='flex space-x-3 items-center pt-1'>
                                <div className='flex space-x-1'>
                                    <p>{post.rating} </p>
                                    <BsFillStarFill className='text-yellow-500 h-6' />
                                </div>
                                <div className='bg-blue-500 hover:bg-blue-600 p-2 m-1 mt-0 rounded-2xl font-semibold text-xs iconAnimation hover:text-white'>
                                    {post.genre}
                                </div>
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

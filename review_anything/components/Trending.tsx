import React from 'react'
import postInterface from '../interfaces/Post'
import { BiTrendingUp } from "react-icons/bi";


const posts: postInterface[]  = [
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
]

const Trending = () => {
  return (
    <div className='border-2 border-gray-900 text-gray-300 mr-2'>
      <div className='flex'>
        <p className='font-bold text-2xl p-2'>Trending</p> 
        <BiTrendingUp className='h-10 w-6 sm:h-12 sm:w-8 text-gray-200  iconAnimation' />  
      </div>
      <div className='mb-8'>
        {
            posts.map(post => {
                return (
                    <div className='flex flex-wrap space-x-2 items-centre m-2'>
                        <img src={post.img} className='h-10 w-10 sm:h-12 sm:w-12 p-2 rounded-full cursor-pointer pt-2' />
                        <div className='flex flex-col'>
                            <p className='font-semibold text-lg'>wow llok at ehis</p>
                            <p className='text-sm'>wow llok at ehisdsadfasd dsa dad adasdsadd</p>
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

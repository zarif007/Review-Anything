import React from 'react'
import postInterface from '../interfaces/Post'
import { FcLike, FcDislike, FcComments } from "react-icons/fc";


const Post : React.FC<postInterface> = ( post ) => {
  const { id, userImg, userName, img, caption } = post
  return (
    <div className='text-white bg-[#131313] shadow-black border-2 border-gray-900 rounded-sm m-12'>
      
      {/* Top part  */}
      <div className='flex items-center p-5'>
        <img 
          className='rounded-full h-12 w-12
          onject-contain border border-blue-500 p-1 mr-3'
          src={userImg} alt='dp'
        />
        <p className='flex-1 font-bold'>{userName}</p>
      </div>

      {/* Main Image  */}
      <img src={img} className='object-cover w-full' alt='img' />

      {/* Icons  */}
      <div className='flex justify-between'>
        <div className='btn border flex justify-center items-center border-gray-900 w-full pt-5 pb-5'>
          <FcLike />
          <span className='text-blue-300 font-semibold'>Agree</span>
        </div>
        <div className='btn border flex justify-center items-center  border-gray-900 w-full pt-5 pb-5'>
          <FcDislike />
          <span className='text-blue-300 font-semibold'>Disagree</span>
        </div>
        <div className='btn border flex justify-center items-center  border-gray-900 w-full pt-5 pb-5'>
          <FcComments/>
          <span className='text-blue-300 font-semibold'>Comment</span>
        </div>
      </div>
    </div>
  )
}

export default Post

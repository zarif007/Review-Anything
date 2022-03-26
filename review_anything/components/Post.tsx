import React from 'react'
import postInterface from '../interfaces/Post'
import { FcComments, FcApproval, FcCancel } from "react-icons/fc";
import { BsFillStarFill } from "react-icons/bs";
import { RiUserStarFill } from "react-icons/ri";
import { useSession } from 'next-auth/react';


const Post : React.FC<postInterface> = ( post ) => {

  const { data: session } = useSession();

  const styles = {
    wrapper: 'text-white bg-[#131313] shadow-black border-2 border-gray-900 rounded-sm mt-4 md:m-2 md:mt-6',
    topWrapper: 'flex items-center p-3 border-b border-gray-900 justify-between',
    userImgIcon: 'rounded-full h-12 w-12 object-contain border border-gray-800 p-1 mr-3',
    mainImg: 'object-contain h-96 w-full bg-[#0E0E10]',
    captionWrapper: 'border-gray-900',
    caption: 'p-5 font-semibold',
    titleAndTypeWrapper: 'border-gray-900 flex items-center',
    title: 'p-5 pb-0 font-bold text-2xl text-blue-500 uppercase',
    type: 'bg-[#0E0E10] p-2 border border-blue-900 font-semibold',
    totalReactionCounter: 'w-full text-blue-400 pl-5 font-semibold text-xs pt-1 pb-1',
    iconsWrapper: 'flex justify-between',
    icons: 'btn border flex justify-center items-center border-gray-900 w-full',
    iconText: 'text-blue-400 text-sm font-semibold',
    genreWrapper: 'bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white',
  }

  const { id, userImg, userName, img, title, review, genre, type, rating, crowdRating } = post
  
  return (
    <div className={styles.wrapper}>
      
      {/* Top part  */}
      <div className={styles.topWrapper}>
        <div className='flex items-center'>
          <img 
            className={styles.userImgIcon}
            src={userImg} alt='dp'
          />
          <p className='flex-1 font-bold'>{userName}</p>
        </div>
        <div className='flex items-center sm:space-x-4 space-x-1'>
          <div className='flex items-center space-x-1'>
            <div className='font-bold text-lg'>{rating}</div>
            <BsFillStarFill className='text-yellow-500 h-12' />
          </div>
          <div className={styles.genreWrapper}>{genre}</div>
        </div>
      </div>

      {/* Main Image  */}
      <img src={img} className={styles.mainImg} alt='img' />

      {/* Title & Type */}
      <div className={styles.titleAndTypeWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <div className='p-5 pb-0'>
          <span className={styles.type}>{type}</span>
        </div>
      </div>

      {/* Review  */}
      <div className={styles.captionWrapper}>
        <p className={styles.caption}>{review}</p>
      </div>

      {/* Total Reactions  */}
      <div className={styles.totalReactionCounter}> 
        Total Reactions 22,123,266
      </div>
      
      {/* Icons  */}
      {
        session?.user && <div className={styles.iconsWrapper}>
          <div className={styles.icons}>
            <FcApproval className='mr-2' />
            <span className={styles.iconText}> (67%)</span>
          </div>
          <div className={styles.icons}>
            
            <RiUserStarFill className='text-green-400 mr-2' />
            <span className={styles.iconText}> {crowdRating}</span>
          </div>
          <div className={styles.icons}>
            <FcComments />
          </div>
        </div>
      }
    </div>
  )
}

export default Post

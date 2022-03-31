import React, { useState } from 'react'
import postInterface from '../interfaces/Post'
import { FcComments, FcApproval, FcCancel } from "react-icons/fc";
import { BsDot, BsFillStarFill } from "react-icons/bs";
import { RiUserStarFill } from "react-icons/ri";
import { useSession } from 'next-auth/react';
import { GoPrimitiveDot } from 'react-icons/go';
import { theme } from '../atoms/themeAtom';
import { useRecoilState } from 'recoil';


const Post : React.FC<postInterface> = ( post ) => {

  const { data: session } = useSession();

  const [isDark, setIsDark] = useRecoilState(theme);

  const [reviewLineLimit, setReviewLineLimit] = useState<number>(2);

  const styles = {
    wrapper: `text-white ${isDark ? 'bg-[#131313] shadow-black border-gray-900' : 'bg-[#fefefa] shadow-[#a1a1aa] border-gray-200'} border-2 rounded-sm mt-4 md:m-2 md:mt-6`,
    topWrapper: `flex items-center p-3 border-b ${isDark ? 'border-gray-900' : 'border-gray-200'} justify-between`,
    userImgIcon: `rounded-full h-12 w-12 object-contain border border-gray-800 p-1 mr-3`,
    mainImg: `object-contain h-96 w-full ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F9F6EE]'}`,
    captionWrapper: `${isDark ? 'border-gray-900' : 'border-gray-200'}`,
    caption: `p-5 font-semibold`,
    title: `p-5 pb-0 font-bold text-2xl text-blue-500 uppercase`,
    type: ` p-2 border border-blue-900 font-semibold`,
    crowdRating: `bg-gray-900 p-2 border border-blue-900 font-semibold flex items-center space-x-1`,
    totalReactionCounterAndCR: `w-full text-blue-400 pl-5 font-semibold text-xs pt-1 pb-1 flex space-x-1`,
    iconsWrapper: `flex justify-between`,
    icons: `btn border flex justify-center items-center ${isDark ? 'border-gray-900' : 'border-gray-200'} w-full`,
    iconText: `text-blue-400 text-sm font-semibold`,
    genreWrapper: `bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white`,
    showButton: `text-sm text-blue-500 pt-0 cursor-pointer`,
    typeAndTimestamp: `text-xs text-gray-400 sm:flex items-center space-x-1 xs:flex-col`,
  }

  const { id, userImg, userName, img, title, review, genre, type, rating, crowdRating, timestamp } = post
  
  return (
    <div className={styles.wrapper}>
      
      {/* Top part  */}
      <div className={styles.topWrapper}>
        <div className='flex items-center'>
          <img 
            className={styles.userImgIcon}
            src={userImg} alt='dp'
          />
          <div className='flex flex-col'>
            <p className='flex-1 font-bold'>{userName}</p>
            {/* Type and timestamp  */}
            <div className={styles.typeAndTimestamp}>
              <p className=''>few minutes ago</p>
              <GoPrimitiveDot className='pt-1 hidden sm:inline' />
              <p>{post.type}</p>
            </div>
          </div>
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

      {/* Title */}
      <div>
        <h1 className={styles.title}>{title}</h1>
      </div>

      {/* Review  */}
      <div className={styles.captionWrapper}>
        <p className={`${styles.caption}`}>{
          review.split('\n').slice(0, reviewLineLimit).map(rs => {
            return(
              <>
                {rs}
                <br />
              </>
            )
          })
        }{
          review.split('\n').length > 2 && (
            reviewLineLimit === 2 ? <p className={styles.showButton}
              onClick={() => setReviewLineLimit(review.split('\n').length)}>Show more...</p> : 
            <p className={styles.showButton}
              onClick={() => setReviewLineLimit(2)}>Show less...</p>
          )
        }</p>
      </div>

      {/* Total Reactions  */}
      <div className={styles.totalReactionCounterAndCR}> 
        <span>Total Reactions 22,123,266</span> 
        <GoPrimitiveDot className='pt-1' />
        <div className='flex items-center space-x-1'>
          <span>Crowd Rating: {post.crowdRating}</span>
          <BsFillStarFill className='text-yellow-500 h-4' />
        </div>
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

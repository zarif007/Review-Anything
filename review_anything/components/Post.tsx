import React from 'react'
import postInterface from '../interfaces/Post'
import { FcComments, FcApproval, FcCancel } from "react-icons/fc";
import { BsFillStarFill } from "react-icons/bs";


const Post : React.FC<postInterface> = ( post ) => {

  const styles = {
    wrapper: 'text-white bg-[#131313] shadow-black border-2 border-gray-900 rounded-sm mt-4 md:m-2 md:mt-6',
    topWrapper: 'flex items-center p-3 border-b border-gray-900',
    userImgIcon: 'rounded-full h-12 w-12 object-contain border border-gray-800 p-1 mr-3',
    mainImg: 'object-contain h-96 w-full bg-[#0E0E10]',
    captionWrapper: 'border-gray-900',
    caption: 'p-5 font-semibold',
    totalReactionCounter: 'w-full text-blue-400 pl-5 font-semibold text-xs pt-1 pb-1',
    iconsWrapper: 'flex justify-between',
    icons: 'btn border flex justify-center items-center border-gray-900 w-full',
  }

  const { id, userImg, userName, img, caption } = post
  
  return (
    <div className={styles.wrapper}>
      
      {/* Top part  */}
      <div className={styles.topWrapper}>
        <img 
          className={styles.userImgIcon}
          src={userImg} alt='dp'
        />
        <p className='flex-1 font-bold'>{userName}</p>
      </div>

      {/* Main Image  */}
      <img src={img} className={styles.mainImg} alt='img' />

      {/* Caption  */}
      <div className={styles.captionWrapper}>
        <p className={styles.caption}>{caption}</p>
      </div>

      {/* Total Reactions  */}
      <div className={styles.totalReactionCounter}> 
        Total Reactions 22,123,266
      </div>
      
      {/* Icons  */}
      <div className={styles.iconsWrapper}>
        <div className={styles.icons}>
          <FcApproval className='mr-2' />
          <span className='text-blue-400 text-sm font-semibold'> (67%)</span>
        </div>
        <div className={styles.icons}>
          <BsFillStarFill className='text-yellow-500' />
        </div>
        <div className={styles.icons}>
          <FcComments />
        </div>
        
      </div>

      
    </div>
  )
}

export default Post

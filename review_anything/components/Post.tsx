import React, { useEffect, useState } from 'react'
import postInterface from '../interfaces/Post'
import { FcComments, FcApproval, FcCancel } from "react-icons/fc";
import { BsFillStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { RiUserStarFill } from "react-icons/ri";
import { useSession } from 'next-auth/react';
import { GoPrimitiveDot } from 'react-icons/go';
import { theme } from '../atoms/themeAtom';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';
import Moment from 'react-moment';


const Post : React.FC<{ post: postInterface }> = ( { post } ) => {

  const { data: session } = useSession();

  const [isDark] = useRecoilState<boolean>(theme);

  const [reviewLineLimit, setReviewLineLimit] = useState<number>(2);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  const [crowdInfo, setCrowdInfo] = useState<{total: number, rating: number, approval: number}>({total: 0, rating: 0, approval: 0});

  const [hasReacted, setHasReacted] = useState<boolean>(false);
  const [hasApproved, setHasApproved] = useState<boolean>(false);

  const styles = {
    wrapper: `text-white ${isDark ? 'bg-[#131313] shadow-black border-gray-900' : 'bg-[#FFFAFA] shadow-[#a1a1aa] border-blue-100'} border-2 rounded-sm mt-4 md:m-2 md:mt-6`,
    topWrapper: `flex items-center p-3 border-b ${isDark ? 'border-gray-900' : 'border-blue-100'} justify-between`,
    userName: `flex-1 font-bold ${isDark ? 'text-white' : 'text-gray-800'}`,
    userImgIcon: `rounded-full h-12 w-12 object-contain border ${isDark ? 'border-gray-800' : 'border-blue-100'} p-1 mr-3`,
    mainImg: `object-contain h-96 w-full ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}`,
    captionWrapper: `${isDark ? 'border-gray-900' : 'border-blue-100'}`,
    caption: `p-5 pt-2 font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`,
    title: `p-5 pb-0 font-bold text-2xl text-blue-500 uppercase`,
    rating: `font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`,
    type: ` p-2 border border-blue-900 font-semibold`,
    crowdRating: `bg-gray-900 p-2 border border-blue-900 font-semibold flex items-center space-x-1`,
    totalReactionCounterAndCR: `w-full text-blue-400 pl-5 font-semibold text-xs pt-1 pb-1 flex space-x-1`,
    iconsWrapper: `flex justify-between`,
    icons: `${isDark ? 'btn border-gray-900' : 'btn-lt border-blue-100'} border flex justify-center items-center w-full`,
    iconText: `text-blue-400 text-sm font-semibold`,
    genreWrapper: `bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white`,
    showButton: `text-sm text-blue-500 pt-0 cursor-pointer`,
    typeAndTimestamp: `text-xs text-gray-400 sm:flex items-center sm:space-x-1 xs:flex-col`,
    settingsIcon: `mr-5 font-extrabold text-lg cursor-pointer ${isDark ? 'text-white' : 'text-black'}`,
  }

  const { _id, user, img, title, review, genre, type, rating, interactions , createdAt } = post;

  // Calculating Crowd Interactions 
  useEffect(() => {

    let sum = 0, total = interactions.approvedBy.length + 
                  interactions.crowdRatings.length;

    if(interactions.crowdRatings){
      interactions.crowdRatings.map((cr: any) => {
        sum += parseFloat(cr.rating);
      });
    }

    const crowdRating = ((interactions.approvedBy.length * 
                      parseFloat(rating) + sum) / total);

    crowdInfo['total'] = total - 1;
    crowdInfo['rating'] = crowdRating;
    crowdInfo['approval'] = (interactions.approvedBy.length / total) * 100;
    
    interactions.approvedBy.find(it => it === session?.user?.email) !== undefined ? 
                                      setHasApproved(true) : setHasApproved(false);

    interactions.crowdRatings.find((it: any) => it.user === session?.user?.email) !== undefined ?
                                      setHasReacted(true) : setHasReacted(false);
 
  }, [interactions])

  return (
    <div className={styles.wrapper}>
      
      {/* Top part  */}
      <div className={styles.topWrapper}>
        <div className='flex items-center'>
          <img 
            className={styles.userImgIcon}
            src={user.image} alt='dp'
          />
          <div className='flex flex-col'>
            <p className={styles.userName}>{user.username}</p>
            {/* Type and timestamp  */}
            <div className={styles.typeAndTimestamp}>
              <p className=''>
                <Moment toNow ago>
                  {createdAt}
                </Moment>
                <span> ago</span>
              </p>
              <GoPrimitiveDot className='pt-1 hidden sm:inline' />
              <p>{type}</p>
            </div>
          </div>
        </div>
        <div className='flex items-center sm:space-x-4 space-x-1'>
          <div className='flex items-center space-x-1'>
            <div className={styles.rating}>{rating}</div>
            <BsFillStarFill className='text-yellow-500 h-12' />
          </div>
          <div 
            onClick={() => setCurrentGenre(genre)}
            className={styles.genreWrapper}>
              {genre}
          </div>
        </div>
      </div>

      {/* Main Image  */}
      <img src={img} className={styles.mainImg} alt='img' />

      {/* Title */}
      <div className='flex items-center justify-between'>
        <h1 className={styles.title}>{title}</h1>
        {
          session?.user?.email === user.email && <div className={styles.settingsIcon}> 
            <BsThreeDotsVertical />
          </div>
        }
        
      </div>

      {/* Review  */}
      <div className={styles.captionWrapper}>
        <p className={`${styles.caption}`}>{
          review.split('\n').slice(0, reviewLineLimit).map((rs: string) => {
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
        <span>Total Interatctions {crowdInfo['total']}</span> 
        <GoPrimitiveDot className='pt-1' />
        <div className='flex items-center space-x-1'>
          <span>Crowd Rating: {crowdInfo['rating']}</span>
          <BsFillStarFill className='text-yellow-500 h-4' />
        </div>
      </div>
      
      {/* Icons  */}
      {
        session?.user && <div className={styles.iconsWrapper}>
          <div className={`${styles.icons} ${hasApproved && 'bg-gray-900'}`}>
            <FcApproval className='mr-2' />
            <span className={styles.iconText}>{crowdInfo['approval']}%</span>
          </div>
          <div className={`${styles.icons} ${hasApproved && 'bg-gray-900'}`}>
            <RiUserStarFill className='text-green-400 mr-2' />
            <span className={styles.iconText}>5</span>
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

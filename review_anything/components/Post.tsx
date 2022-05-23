import React, { useEffect, useState } from 'react'
import postInterface from '../interfaces/Post'
import { FcComments, FcApproval } from "react-icons/fc";
import { BsFillStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { RiUserStarFill } from "react-icons/ri";
import { useSession } from 'next-auth/react';
import { GoPrimitiveDot } from 'react-icons/go';
import { theme } from '../atoms/themeAtom';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';
import Moment from 'react-moment';
import axios from 'axios';
import { domain } from './../domain';
import StarsRating from 'react-star-rate';
import Link from 'next/link';
import crowdInfoInterface from '../interfaces/CrowdInfo';
import PostOptions from './PostOptions';
import { GiTireIronCross } from "react-icons/gi";


const Post : React.FC<{ post: postInterface }> = ( { post } ) => {

  const { data: session } = useSession();

  const [isDark] = useRecoilState<boolean>(theme);

  const [reviewLineLimit, setReviewLineLimit] = useState<number>(2);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  const [crowdInfo, setCrowdInfo] = useState<crowdInfoInterface>({total: 0, rating: 0, approval: 0});

  const [hasRated, setHasRated] = useState<number>(-1);
  const [hasApproved, setHasApproved] = useState<boolean>(false);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showPostOptions, setShowPostOptions] = useState<boolean>(false);

  const styles = {
    wrapper: `text-white ${isDark ? 'bg-[#131313] shadow-black border-gray-900' : 'bg-[#FFFAFA] shadow-[#a1a1aa] border-blue-100'} border-2 rounded-sm mt-4 md:m-2 md:mt-6`,
    topWrapper: `flex items-center p-3 border-b ${isDark ? 'border-gray-900' : 'border-blue-100'} justify-between`,
    userName: `flex-1 font-bold ${isDark ? 'text-white' : 'text-gray-800'}`,
    userImgIcon: `rounded-full h-12 w-12 object-contain border ${isDark ? 'border-gray-800' : 'border-blue-100'} p-1 mr-3`,
    mainImg: `object-contain h-96 w-full ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'} cursor-pointer`,
    captionWrapper: `${isDark ? 'border-gray-900' : 'border-blue-100'}`,
    caption: `p-5 pt-2 font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`,
    title: `p-5 pb-0 font-bold text-2xl text-blue-500 uppercase cursor-pointer`,
    rating: `font-bold text-lg ${isDark ? 'text-white' : 'text-gray-800'}`,
    type: ` p-2 border border-blue-900 font-semibold`,
    crowdRating: `bg-gray-900 p-2 border border-blue-900 font-semibold flex items-center space-x-1`,
    totalReactionCounterAndCR: `w-full text-blue-400 pl-5 font-semibold text-xs pt-1 pb-1 flex space-x-1`,
    iconsWrapper: `flex justify-between`,
    icons: ` ${isDark ? 'btn border-gray-900' : 'btn-lt border-blue-100'} border flex justify-center items-center w-full border-b-0`,
    iconText: `text-blue-400 text-sm font-semibold`,
    genreWrapper: `bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white`,
    showButton: `text-sm text-blue-500 pt-0 cursor-pointer`,
    typeAndTimestamp: `text-xs text-gray-400 sm:flex items-center sm:space-x-1 xs:flex-col`,
    settingsIcon: `mr-5 font-extrabold text-lg cursor-pointer ${isDark ? 'text-white' : 'text-black'}`,

    ratingViewer: `${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-black'} p-1 rounded-sm mt-1`,

    modalTopWrapper: `justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`,
    modalFirstWrapper: `relative w-auto my-6 mx-auto max-w-full min-w-[25%]`,
    modalSecondWrapper: `border-0 rounded-lg shadow-lg relative flex flex-col w-full ${isDark ? 'bg-[#131313]' : 'bg-[#F5F5F5]'} outline-none focus:outline-none`,
    modalHeaderText: `p-4 pb-0 font-semibold text-xl ${isDark ? 'text-white' : 'text-black'} uppercase`,
    modalButton: `background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
    modalOuterSpace: `opacity-75 fixed inset-0 z-40 bg-black`,
  }

  let { _id, user, img, title, review, genre, type, rating, interactions , createdAt } = post;

  const [starRating, setStarRating] = useState<number>(parseFloat(rating));

  // Storing current user's interaction on this post
  useEffect(() => {
    interactions.approvedBy.find(it => {
      if(it === session?.user?.email){
        setHasApproved(true);
      }
    });

    interactions.crowdRatings.find((it: any) => {
      if(it.user === session?.user?.email){
        setHasRated(it.rating)
      }
    });
  }, [session])

  // Calculating Crowd Interactions 
  const calculateInteractions = () => {
    let sum = 0, total = interactions.approvedBy.length + 
                  interactions.crowdRatings.length;

    if(interactions.crowdRatings){
      interactions.crowdRatings.map((cr: any) => {
        sum += parseFloat(cr.rating);
      });
    }

    const crowdRating = total === 0 ? 0 : ((interactions.approvedBy.length * 
                      parseFloat(rating) + sum) / total);

    const updatedCrowdInfo: crowdInfoInterface = {total: 0, 
                                                  rating: 0, 
                                                  approval: 0};

    updatedCrowdInfo['total'] = total;  
    updatedCrowdInfo['rating'] = crowdRating;
    updatedCrowdInfo['approval'] = total === 0 ? 0 : 
                                  (interactions.approvedBy.length / total) * 100;

    setCrowdInfo(updatedCrowdInfo);
  }

  useEffect(() => {
    calculateInteractions();
  }, []);

  const handleApprovedButton = () => {
    const updatedApprovedBy: string[] = interactions.approvedBy.filter(it => it !== session?.user?.email);

    if(hasApproved){
      interactions = {
        approvedBy: updatedApprovedBy,
        crowdRatings: interactions.crowdRatings,
      };
    } else if(session?.user?.email) {
      interactions = {
        approvedBy: [...updatedApprovedBy, session?.user?.email],
        crowdRatings: interactions.crowdRatings.filter((it: any) => it.user !== session?.user?.email),
      };
      setHasRated(-1);
    }

    const updatedPost: postInterface = {user, img, title, review, genre, type, rating, interactions};

    axios.put(`${domain}/posts/${_id}`, updatedPost);

    calculateInteractions();
    setHasApproved(!hasApproved);
  }

  const handleAddRating = () => {
    setShowModal(false);

    const updatedCrowdRatings = interactions.crowdRatings.filter((it: any) => it.user !== session?.user?.email);

    interactions = {
      approvedBy: interactions.approvedBy.filter(it => it !== session?.user?.email),
      crowdRatings: [...updatedCrowdRatings, {user: session?.user?.email, rating: starRating}],
    }

    const updatedPost: postInterface = {user, img, title, review, genre, type, rating, interactions};

    axios.put(`${domain}/posts/${_id}`, updatedPost);

    calculateInteractions();
    setHasApproved(false);
    setHasRated(starRating);
  }

  const handleRemoveRating = () => {

    interactions = {
      approvedBy: interactions.approvedBy.filter(it => it !== session?.user?.email),
      crowdRatings: interactions.crowdRatings.filter((it: any) => it.user !== session?.user?.email),
    }

    const updatedPost: postInterface = {user, img, title, review, genre, type, rating, interactions};

    axios.put(`${domain}/posts/${_id}`, updatedPost);

    calculateInteractions();
    setHasApproved(false);
    setHasRated(-1);
  }

  return (
    <div className={styles.wrapper}>
      
      {/* Top part  */}
      <div className={styles.topWrapper}>
        <div className='flex items-center '>
          <img 
            className={styles.userImgIcon}
            src={user?.image} alt='dp'
          />
          <div className='flex flex-col'>
            <p className={styles.userName}>{user?.username}</p>
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
      <Link href={`/post/${_id}`}>
        <img src={img} className={styles.mainImg} alt='img' />
      </Link>
      
      {/* Title */}
      <div className='flex items-center justify-between'>
        <Link href={`/post/${_id}`}>
          <a target="_blank" rel="noopener noreferrer">
            <h1 className={styles.title}>{title}</h1>
          </a>
        </Link> 
        {
          session?.user?.email === user?.email && <div className={styles.settingsIcon}> 
            {
              showPostOptions ? <GiTireIronCross onClick={() => setShowPostOptions(false)} /> :
                <BsThreeDotsVertical onClick={() => setShowPostOptions(true)} />
            }  
          </div>
        }
      </div>

      {/* Post Options  */}
      {
        showPostOptions && <PostOptions />
      }
      
      {/* Crowd rating taker Modal  */}
      {
        showModal && (
          <>
            <div className={styles.modalTopWrapper}>
              <div className={styles.modalFirstWrapper}>
                <div className={styles.modalSecondWrapper}>
                  <span className={styles.modalHeaderText}>
                    What rating you think {title} should be
                  </span>
                  <div className='flex items-center justify-center p-1'>
                    <StarsRating
                      value={starRating}
                      onChange={value => {
                        let rt = value || 0;
                        setStarRating(rt);
                      }}
                    />
                    <span className={styles.ratingViewer}>{starRating}</span>
                  </div>
                  <div className="flex items-center justify-end p-2">
                    <button
                      className={`${styles.modalButton} text-blue-500`}
                      type="button"
                      onClick={handleAddRating}
                    >
                      Done
                    </button>
                    <button
                      className={`${styles.modalButton} text-red-500`}
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.modalOuterSpace}></div>
          </>
        )
      }

      {/* Review  */}
      <div className={styles.captionWrapper}>
        <p className={`${styles.caption}`}>{
          review?.split('\n').slice(0, reviewLineLimit).map((rs: string) => {
            return(
              <div
                onClick={() => setReviewLineLimit(review?.split('\n').length)}>
                  {rs}
                  <br />
              </div>
            )
          })
        }{
          review?.split('\n').length > 2 && (
            reviewLineLimit === 2 ? <p className={styles.showButton}
              onClick={() => setReviewLineLimit(review?.split('\n').length)}>Show more...</p> : 
            <p className={styles.showButton}
              onClick={() => setReviewLineLimit(2)}>Show less...</p>
          )
        }</p>
      </div>

      {/* Total Reactions  */}
      <div className={styles.totalReactionCounterAndCR}> 
        <span>Total Interatctions {crowdInfo['total']}</span> 
        {
          crowdInfo.total > 0 &&
          <>
            <GoPrimitiveDot className='pt-1' />
            <div className='flex items-center space-x-1'>
              <span>Crowd Rating: {crowdInfo['rating'].toFixed(1)}</span>
              <BsFillStarFill className='text-yellow-500 h-4' />
            </div>
          </>
        }
      </div>
      
      {/* Icons  */}
      {
        session?.user && <div className={styles.iconsWrapper}>

          <div 
            className={`${styles.icons} ${hasApproved && (isDark ? 'bg-gray-900' : 'bg-blue-100')} border-l-0`}
            onClick={handleApprovedButton}>
              <FcApproval className='mr-2' />
            <span className={styles.iconText}>{crowdInfo['approval'].toFixed(0)}%</span>
          </div>

          <div 
            className={`${styles.icons} ${hasRated !== -1 && (isDark ? 'bg-gray-900' : 'bg-blue-100')}`}
            onClick={() => hasRated !== -1 ? handleRemoveRating() : setShowModal(true)}>
              <RiUserStarFill className='text-green-400 mr-2' />
              <span className={styles.iconText}>{hasRated !== -1 && (
                <div className='flex items-center'>
                  {hasRated}
                  <BsFillStarFill className='text-yellow-500 h-4' />
                </div>
              )}</span>
          </div>

          <Link href={`/post/${_id}`}>
            <div className={`${styles.icons} border-r-0`}>
              <FcComments />
            </div>
          </Link>
          
        </div>
      }
    </div>
  )
}

export default Post

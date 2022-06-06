import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { postModalState } from '../../atoms/postModalAtom';
import { Dialog, Transition } from '@headlessui/react'
import { FcAddImage } from 'react-icons/fc';
import Axios from 'axios';
import postInterface from '../../interfaces/Post';
import StarsRating from "react-star-rate";
import { useSession } from 'next-auth/react';
import { theme } from '../../atoms/themeAtom';
import axios from 'axios';
//@ts-ignore
import io from 'Socket.IO-client'
import { domain } from './../../domain';
import SelectComp from '../SelectComp';
import { postOnEditState } from '../../atoms/postOnEditAtom';
import { useRouter } from 'next/router';
import { FaGgCircle } from "react-icons/fa";
import { currentUser } from '../../atoms/currentUserAtom';

let socket: any;

const postFormat: postInterface = {
  user: {
    _id: '',
    username: '',
    email: '',
    image: ''
  },
  img: '',
  title: '',
  review: '',
  genre: '',
  type: '',
  rating: '',
  interactions: {
    approvedBy: [],
    crowdRatings: [],
  }
}


const PostModal = () => {

  const [open, setOpen] = useRecoilState<boolean>(postModalState);

  const [postOnEdit, setPostOnEdit] = useRecoilState<postInterface>(postOnEditState);

  const [post, setPost] = useState<postInterface>(postFormat);

  const [isDark] = useRecoilState(theme);

  const [user, setUser] = useRecoilState(currentUser);

  const { data: session } = useSession();

  const filePickerRef = useRef<any>(null);

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [starRating, setStarRating] = useState<string>('0');

  const router = useRouter()

  useEffect(() => {
    socketInitializer();
  }, [])

  useEffect(() => {
    setPost({
      user: {
        _id: postOnEdit.user._id,
        username: postOnEdit.user.username,
        email: postOnEdit.user.email,
        image: postOnEdit.user.image,
      },
      img: postOnEdit.img,
      title: postOnEdit.title,
      review: postOnEdit.review,
      genre: postOnEdit.genre,
      type: postOnEdit.type,
      rating: postOnEdit.rating,
      interactions: {
        approvedBy: postOnEdit.interactions.approvedBy,
        crowdRatings: postOnEdit.interactions.crowdRatings,
      }
    });

    setSelectedFile(postOnEdit.img);
    setStarRating(postOnEdit.rating);
  }, [postOnEdit]);



  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()
  }
  
  const styles = {
    wrapper: `flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-gray-800 opacity-75 transition-opacity`,
    postWrapper: `inline-block align-bottom ${isDark ? 'bg-[#131313]' : 'bg-[#FFFAFA]'} rounded-lg px-4 pt-5 pb-4 text-left
      overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
      sm:p-6 text-white `,
    imageWrapper: `mx-auto flex items-center justify-center h-16 w-16 rounded-full cursor-pointer`,
    uploadTitle: `text-lg leading-6 font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} pb-3`,
    titleInput: `border-none focus:ring-0 w-full text-center ${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-gray-900'} mt-4 scrollbar-hide`,
    review: `border-none focus:ring-0 w-full ${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-gray-900'} mt-4 scrollbar-hide`,
    postButton: `bg-blue-600 text-white p-2 rounded-sm w-full hover:bg-blue-700 font-semibold 
      disabled:bg-blue-400 disabled:cursor-not-allowed`,
    ratingViewer: `${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-black'} p-1 rounded-sm mt-1`,
  }

  const checkIsDisable = () => {
    
    setIsDisabled(!post.img || !post.title || !post.review || 
      !post.genre || !post.type || !post.rating || isLoading || user === undefined);
  }

  useEffect(() => {
    checkIsDisable()
  }, [post])

  const addImageToPost = (e: any) => {
    const reader = new FileReader();

    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    } 
  }

  const uploadPost = async () => {
    if(isDisabled) return;

    setIsLoading(true);

    setIsDisabled(true);

    post['user'] = {
      _id: user._id,
      username: user.name,
      image: user.image,
      email: user.email,
    }
    // post['interactions'].approvedBy.push(post.user.email);

    const formData = new FormData();

    formData.append('file', selectedImage);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CN_STORAGE_NAME || '');

    let newId = '';

    await Axios.post(process.env.NEXT_PUBLIC_CN_QUERY_URL || '', formData)
      .then(response => {
        post['img'] = response.data.secure_url;
      });

    console.log('Loading....')

    await axios.post(`${domain}/posts`, post)
      .then(res => newId = res.data.data._id )

    await axios.get(`${domain}/trending`)
      .then(res => {
        socket.emit('input-change', res.data.data)
      });
    
    setPost({
      user: {
        _id: '',
        username: '',
        email: '',
        image: ''
      },
      img: '',
      title: '',
      review: '',
      genre: '',
      type: '',
      rating: '',
      interactions: {
        approvedBy: [],
        crowdRatings: [],
      }
    });

    setOpen(false)
    setIsLoading(false)
    setSelectedFile(null)
    setStarRating('0')

    router.push(`http://localhost:3000/post/${newId}`)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className='fixed mt-20 z-10 inset-0 overflow-y-auto'
        onClose={() => {
          setOpen(false);
          setPostOnEdit({
            user: {
              _id: '',
              username: '',
              email: '',
              image: ''
            },
            img: '',
            title: '',
            review: '',
            genre: '',
            type: '',
            rating: '',
            interactions: {
              approvedBy: [],
              crowdRatings: [],
            }
          })
        }}
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

            {/* Post Upload Part   */}
            <div className={styles.postWrapper}>

              <div className=''>
                {/* Image Upload Part  */}
                {
                  !selectedFile ? <div
                    className={styles.imageWrapper}
                    onClick={() => filePickerRef?.current?.click()} >
                    <FcAddImage className='h-16 w-16' aria-hidden='true' />
                  </div> : <div>
                    <img src={selectedFile} alt='img' onClick={() => {
                      setSelectedFile(null);
                      setIsDisabled(true);
                    }}
                      className='w-full object-cover cursor-pointer' />
                  </div>
                }

                <div>
                  {
                    !selectedFile && <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                      as='h3'
                      className={styles.uploadTitle} >
                        Upload a Photo
                      </Dialog.Title>
                    </div>
                  }
                  <div>
                    <input
                      ref={filePickerRef}
                      type='file'
                      accept="image/*"
                      hidden
                      onChange={(e: any) => {
                        addImageToPost(e)
                        post['img'] = '*';
                        checkIsDisable()
                      }}
                    />
                  </div>

                  {/* Title  */}
                  <div>
                    <textarea
                      rows={1}
                      className={styles.titleInput}
                      defaultValue={post['title']}
                      placeholder='Give a Title'
                      onChange={e => {
                        post['title'] = e.target.value.trim()
                        checkIsDisable()
                      }}
                    />
                  </div>

                  {/* Rating  */}
                  <div className='flex items-center justify-center pb-1'>
                    <StarsRating
                      value={parseFloat(starRating)}
                      onChange={value => {
                        let rt = value?.toString() || '';
                        post['rating'] = rt;
                        setStarRating(rt);
                        checkIsDisable()
                      }}
                    />
                    <span className={styles.ratingViewer}>{starRating}</span>
                  </div>

                  {/* Selection of Genre and Type part  */}
                  <div className='flex justify-between space-x-2'>
                    <SelectComp type='genres' post={post} checkIsDisable={checkIsDisable} />
                    <SelectComp type='type' post={post} checkIsDisable={checkIsDisable} />
                  </div>

                  {/* Review Part  */}
                  <div>
                    <textarea
                      rows={3}
                      className={styles.review}
                      placeholder='Bump Review Here'
                      defaultValue={post['review']}
                      onChange={e => {
                        post['review'] = e.target.value.trim()
                        checkIsDisable()
                      }}
                    />
                  </div>
                </div>

                <div className='mt-5 sm:mt-6'>
                  <button onClick={uploadPost}
                    className={`${styles.postButton}`}
                    type='button'
                    disabled={isDisabled}
                  >
                    {
                      !isLoading ? (postOnEdit.title !== '' ? 'Update' : 'Post') : 
                      <div className='flex space-x-2 justify-center items-center'>
                        <FaGgCircle className="animate-spin h-5 w-5 mr-3" />
                        Processing...
                      </div>
                    }
                    
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>


  );
}

export default PostModal
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { postModalState } from '../../atoms/postModalAtom';
import { Dialog, Transition } from '@headlessui/react'
import { FcAddImage } from 'react-icons/fc';
import Axios from 'axios';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '../../firebase'
import postInterface from '../../interfaces/Post';
import StarsRating from "react-star-rate";
import Select from 'react-select'
import { useSession } from 'next-auth/react';
import { genres } from '../../genres';
import { theme } from '../../atoms/themeAtom';


const PostModal = () => {

  const [open, setOpen] = useRecoilState<boolean>(postModalState);

  const [isDark] = useRecoilState(theme);

  const { data: session } = useSession();

  const filePickerRef = useRef<any>(null);

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const [starRating, setStarRating] = useState<string>('0');
  
  const styles = {
    wrapper: `flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-gray-800 opacity-75 transition-opacity`,
    postWrapper: `inline-block align-bottom ${isDark ? 'bg-[#131313]' : 'bg-[#FFFAFA]'} rounded-lg px-4 pt-5 pb-4 text-left
      overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
      sm:p-6 text-white `,
    imageWrapper: `mx-auto flex items-center justify-center h-16 w-16 rounded-full cursor-pointer`,
    uploadTitle: `text-lg leading-6 font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'} pb-3`,
    titleInput: `border-none focus:ring-0 w-full text-center ${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-gray-900'} mt-4 scrollbar-hide`,
    select: `basic-multi-select ${isDark ? 'text-white' : 'text-black'} font-semibold focus:ring-0 w-full`,
    review: `border-none focus:ring-0 w-full ${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-gray-900'} mt-4 scrollbar-hide`,
    postButton: `bg-blue-600 text-white p-2 rounded-sm w-full hover:bg-blue-700 font-semibold 
      disabled:bg-blue-400 disabled:cursor-not-allowed`,
    ratingViewer: `${isDark ? 'bg-black' : 'bg-[#F5F5F5] text-black'} p-1 rounded-sm mt-1`,
  }

  const TypeOptions = [
    { value: 'Paid🤑', label: 'Paid🤑' },
    { value: 'Non-Paid✨', label: 'Non-Paid✨' },
    { value: 'Non-Paid(I swear)🔥', label: 'Non-Paid(I swear)🔥' }
  ]

  const selectStyle = {
    valueContainer: (base: any) => ({
      ...base,
      background: `${isDark ? 'black' : '#F5F5F5'}`,
    }),
    control: (base: any, state: any) => ({
      ...base,
      border: `${isDark ? 'black' : '#F5F5F5'}`,
      background: `${isDark ? 'black' : '#F5F5F5'}`,
    }),
    menuList: (styles: any) => ({
      ...styles,
      background: `${isDark ? 'black' : '#F5F5F5'}`
    }),
    placeholder: (defaultStyles: any) => {
      return {
          ...defaultStyles,
          color: `${isDark ? 'white' : 'black'}`,
      }
    }
  } 

  const [post, setPost] = useState<postInterface>({
    userName: '',
    userImg: '',
    img: '',
    title: '',
    review: '',
    genre: '',
    type: '',
    rating: '',
    crowdRating: '',
    timestamp: new Date()
  });

  const checkIsDisable = () => {
    
    setIsDisabled(post.img === '' || post.title === '' || post.review === '' || 
      post.genre === '' || post. type === '' || post.rating === '' || isLoading);
  }

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
    if(isLoading) return;

    setIsLoading(true);

    post['userImg'] = session?.user?.image || '';
    post['userName'] = session?.user?.name || '';
    post['crowdRating'] = starRating;
    post['timestamp'] = serverTimestamp()

    const formData = new FormData();

    formData.append('file', selectedImage);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CN_STORAGE_NAME || '');

    Axios.post(process.env.NEXT_PUBLIC_CN_QUERY_URL || '', formData)
      .then(response => {
        post['img'] = response.data.secure_url;
        const docRef = addDoc(collection(db, 'posts'), post);

        setPost({
          userName: '',
          userImg: '',
          img: '',
          title: '',
          review: '',
          genre: '',
          type: '',
          rating: '',
          crowdRating: '',
          timestamp: new Date()
        })
      });
    

    setOpen(false)
    setIsLoading(false)
    setSelectedFile(null)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className='fixed mt-20 z-10 inset-0 overflow-y-auto'
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
                    <Select
                        name="genre"
                        options={genres}
                        className={styles.select}
                        classNamePrefix="Select Genre"
                        defaultValue={post['genre'] === '' ?
                          'Genre' : {value: post['genre'], label: post['genre']}}
                        placeholder='Genre'
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary25: 'liteblue',
                            primary: 'black',
                            neutral50: '#1A1A1A',
                          },
                        })}
                        onChange={(e: any) => {
                          post['genre'] = e.value
                          checkIsDisable()
                        }}
                        styles={selectStyle}
                      />

                    <Select
                        name="type"
                        options={TypeOptions}
                        className={styles.select}
                        classNamePrefix="Select Type"
                        defaultValue={post['type'] === '' ?
                          'Type' : {value: post['type'], label: post['type']}}
                        placeholder='Type'
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,
                          colors: {
                            ...theme.colors,
                            primary25: 'liteblue',
                            primary: 'black',
                            neutral50: '#1A1A1A',
                          },
                        })}
                        onChange={(e: any) => {
                          post['type'] = e.value
                          checkIsDisable()
                        }}
                        styles={selectStyle}
                      />
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
                    className={styles.postButton}
                    type='button'
                    disabled={isDisabled}
                  >
                    Post
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

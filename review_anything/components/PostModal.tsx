import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { postModalState } from '../atoms/postModalAtom';
import { Dialog, Transition } from '@headlessui/react'
import { FcAddImage } from 'react-icons/fc';
import Axios from 'axios';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import { db } from '../firebase'
import postInterface from '../interfaces/Post';
import StarsRating from "react-star-rate";
import Select from 'react-select'
import { selectStyle } from '../customStyles/selectStyle';
import { useSession } from 'next-auth/react';
import { objects } from '../objects';



const PostModal = () => {

  const [open, setOpen] = useRecoilState(postModalState);

  const { data: session } = useSession();

  const filePickerRef = useRef<any>(null);

  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [starRating, setStarRating] = useState<string>('0');

  const TypeOptions = [
    { value: 'Paid🤑', label: 'Paid🤑' },
    { value: 'Non-Paid✨', label: 'Non-Paid✨' },
    { value: 'Non-Paid(I swear)🔥', label: 'Non-Paid(I swear)🔥' }
  ]


  const [post, setPost] = useState<postInterface>({
    id: '66',
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
    formData.append('upload_preset', 'review-at');

    Axios.post('https://api.cloudinary.com/v1_1/dypopqvai/image/upload', formData)
      .then(response => {
        post['img'] = response.data.secure_url;
        const docRef = addDoc(collection(db, 'posts'), post);
      });
    

    setOpen(false)
    setIsLoading(false)
    setSelectedFile(null)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={setOpen}
      >
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child 
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-800 opacity-75 transition-opacity' />
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
            <div className='inline-block align-bottom bg-[#131313] rounded-lg px-4 pt-5 pb-4 text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
            sm:p-6 text-white '>
              <div className=''>
                {
                  !selectedFile ? <div 
                    className='mx-auto flex items-center justify-center h-16 w-16 rounded-full cursor-pointer'
                    onClick={() => filePickerRef?.current?.click()} >
                    <FcAddImage className='h-16 w-16' aria-hidden='true' />
                  </div> : <div>
                    <img src={selectedFile} alt='img' onClick={() => setSelectedFile(null)}
                      className='w-full object-cover cursor-pointer' />
                  </div>
                }
                
                <div>
                  {
                    !selectedFile && <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title 
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-200 pb-3' >
                        Upload a Photo
                      </Dialog.Title>
                    </div>
                  } 
                  <div>
                    <input
                      ref={filePickerRef}
                      type='file'
                      hidden
                      onChange={addImageToPost} 
                    />
                  </div>

                  <div>
                    <textarea 
                      rows={1} 
                      className='border-none focus:ring-0 w-full text-center bg-black mt-4 scrollbar-hide' 
                      placeholder='Give a Title'
                      onChange={e => post['title'] = e.target.value}
                    />
                  </div>

                  <div className='flex items-center justify-center pb-1'> 
                    <StarsRating
                      value={parseFloat(starRating)}
                      onChange={value => {
                        let rt = value?.toString() || '';
                        post['rating'] = rt;
                        setStarRating(rt);
                      }}
                    />
                  </div>

                  <div className='flex justify-between space-x-2'>

                    <Select
                        name="genre"
                        options={objects}
                        className="basic-multi-select text-white font-semibold focus:ring-0 w-full"
                        classNamePrefix="Select Genre"
                        placeholder='Genre'
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 0,  
                          colors: {
                            ...theme.colors,
                            primary25: 'liteblue',
                            primary: 'black',
                            neutral50: 'white',
                          },
                        })}
                        onChange={(e: any) => post['genre'] = e.value}
                        styles={selectStyle}
                      />

                    <Select
                        name="type"
                        options={TypeOptions}
                        className="basic-multi-select text-white font-semibold focus:ring-0 w-full"
                        classNamePrefix="Select Type"
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
                        onChange={(e: any) => post['type'] = e.value}
                        styles={selectStyle}
                      />
                  </div>
                  
                  <div>
                    <textarea
                      rows={3}
                      className='border-none focus:ring-0 w-full text-center bg-black mt-4 scrollbar-hide' 
                      placeholder='Bump Review Here' 
                      onChange={e => post['review'] = e.target.value}
                    />
                  </div>
                </div>

                <div className='mt-5 sm:mt-6'>
                  <button onClick={uploadPost} disabled={isLoading}
                    className='bg-blue-600 text-white p-2 rounded-sm w-full hover:bg-blue-700 font-semibold'
                    type='button'
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
  )
}

export default PostModal

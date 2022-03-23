import React, { Fragment } from 'react'
import { useRecoilState } from 'recoil';
import { postModalState } from '../atoms/postModalAtom';
import { Dialog, Transition } from '@headlessui/react'

const PostModal = () => {

  const [open, setOpen] = useRecoilState(postModalState);

  console.log(open)

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
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full
            sm:p-6 text-white '>
              <div>
                <div className='mt-5 sm:mt-6'>

                  <button 
                    className='bg-blue-600 text-white p-2 rounded-sm w-full hover:bg-blue-700 font-semibold'
                    type='button'
                  >
                    Upload
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

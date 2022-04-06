import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../../atoms/genreAtom';
import { poolModalState } from '../../atoms/poolModalAtom';
import { theme } from '../../atoms/themeAtom';
import { objects } from '../../objects';

const PoolModal = () => {
  const [isDark] = useRecoilState<boolean>(theme);

  const [open, setOpen] = useRecoilState<boolean>(poolModalState);

  const [objs] = useState<{value: string, label: string}[]>(objects);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  const styles = {
    wrapper: `flex items-center justify-center min-h-screen sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`,
    dialogOverlay: `fixed inset-0 bg-gray-800 opacity-75 transition-opacity`,
    genreWrapper: `inline-block align-bottom ${isDark ? 'bg-[#0E0E10]' : 'bg-[#FFFAFA]'} rounded-lg text-left
        overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm md:max-w-lg w-full
        text-white `,
    secondWrapper: `${isDark ? 'bg-gray-900 border-blue-900' : 'bg-blue-100 border-blue-800'}  border bg-opacity-75 rounded-lg px-4 pt-5 pb-4 sm:p-6 `,
    objWrapper: `flex flex-wrap p-1`,
    object: `bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white`,
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

            {/* Genre Upload Part   */}
            <div className={styles.genreWrapper}>
                <div className={styles.secondWrapper}>
                    <div className={styles.objWrapper}>
                        {
                        objs.map(obj => {
                            return (
                                <div 
                                    className={styles.object} 
                                    key={obj.value} 
                                    onClick={() => {
                                        setCurrentGenre(obj.value)
                                        setOpen(false);
                                    }}
                                >
                                    {obj.value}
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default PoolModal

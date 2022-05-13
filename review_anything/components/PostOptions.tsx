import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useRecoilState } from 'recoil';
import { theme } from '../atoms/themeAtom';

const PostOptions = () => {


  const [isDark] = useRecoilState<boolean>(theme);


  const styles = {
    wrapper: `p-5 ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}   my-2 flex space-x-3 md:space-x-4 lg:space-x-6 items-center`,
    text: `flex items-center space-x-1 text-lg`,
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.text} text-blue-500`}>
        <p className='font-semibold'>Edit</p>
        <FaRegEdit />
      </div>
      <div className={`${styles.text} text-red-500`}>
        <p className='font-semibold'>Delete</p>
        <RiDeleteBin6Line />
      </div>
    </div>
  )
}

export default PostOptions

import axios from 'axios';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useRecoilState } from 'recoil';
import { postModalState } from '../atoms/postModalAtom';
import { postOnEditState } from '../atoms/postOnEditAtom';
import { theme } from '../atoms/themeAtom';
import { domain } from '../domain';
import postInterface from '../interfaces/Post';

const PostOptions: React.FC<{ post: postInterface }> = ({ post }) => {


  const [isDark] = useRecoilState<boolean>(theme);

  const [open, setOpen] = useRecoilState(postModalState);

  const [postOnEdit, setPostOnEdit] = useRecoilState<postInterface>(postOnEditState);


  const styles = {
    wrapper: `p-5 ${isDark ? 'bg-[#0E0E10]' : 'bg-[#F5F5F5]'}   my-2 flex space-x-3 md:space-x-4 lg:space-x-6 items-center`,
    text: `flex items-center space-x-1 text-lg`,
  }

  const editPost = () => {
    setOpen(true);
    setPostOnEdit(post);
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.text} text-blue-500 cursor-pointer`}
        onClick={editPost}>
        <p className='font-semibold'>Edit</p>
        <FaRegEdit />
      </div>
      <div className={`${styles.text} text-red-500 cursor-pointer`}>
        <p className='font-semibold'>Delete</p>
        <RiDeleteBin6Line />
      </div>
    </div>
  )
}

export default PostOptions

import React, { useEffect, useState } from 'react'
import Post from './Post'
import postInterface from './../interfaces/Post';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';
import { postsState } from './../atoms/postsAtom';


const Posts: React.FC = () => {
  
  const [postsFromDB] = useRecoilState<postInterface[]>(postsState);
  const [posts, setPosts] = useRecoilState<postInterface[]>(postsState);

  const [currentGenre] = useRecoilState<string>(selectedGenre);

  useEffect(() => {

    let updatedPosts : postInterface[] = [];

    if(currentGenre === ''){
      updatedPosts = postsFromDB;
    } else {
      updatedPosts = postsFromDB.filter(post => post.genre === currentGenre);
    }

    setPosts(updatedPosts);

  }, [currentGenre])

  return (
    <div className=''>
      {
        posts.map((post: postInterface, index) => {
          return (
            <Post 
              key={index}
              post={post}
            />
          )
        })
      }
    </div>
  )
}



export default Posts

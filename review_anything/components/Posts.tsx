import React, { useEffect, useState } from 'react'
import Post from './Post'
import postInterface from './../interfaces/Post';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';
import { postsState } from './../atoms/postsAtom';


const Posts: React.FC = () => {
  
  const [posts, setPosts] = useRecoilState<any[]>(postsState);

  const [postsFromDB, setPostsFromDB] = useState<postInterface[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<postInterface[]>([]);

  const [currentGenre] = useRecoilState<string>(selectedGenre);

  useEffect(() => {

    setPostsFromDB(posts);
    setFilteredPosts(posts);
  }, [posts]);


  useEffect(() => {

    let updatedPosts: postInterface[] = [];

    if(currentGenre === ''){
      updatedPosts = postsFromDB;
    } else {
      updatedPosts = postsFromDB.filter(post => post.genre === currentGenre);
    }

    setFilteredPosts(updatedPosts);

  }, [currentGenre])

  return (
    <div className=''>
      {
        filteredPosts.map((post: postInterface, index) => {
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

import React, { useEffect, useState } from 'react'
import Post from './Post'
import postInterface from './../interfaces/Post';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';


const Posts: React.FC<{ posts: postInterface[] }> = ( {posts} ) => {
  
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
      updatedPosts = posts;
    } else {
      updatedPosts = postsFromDB.filter(post => post.genre === currentGenre);
    }

    setFilteredPosts(updatedPosts);

  }, [currentGenre])

  return (
    <div className=''>
      {
        currentGenre !== '' ? filteredPosts.map((post: postInterface) => {
          return (
            <Post 
              key={post._id}
              post={post}
            />
          )
        }) : 
        posts.map((post: postInterface) => {
          return (
            <Post 
              key={post._id}
              post={post}
            />
          )
        })
      }
    </div>
  )
}



export default Posts

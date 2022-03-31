import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'
import postInterface from './../interfaces/Post';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';



const Posts: React.FC = () => {

  const [posts, setPosts] = useState<postInterface[]>([]);

  const [postsFromDB, setPostsFromDB] = useState<postInterface[]>([]);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  useEffect(() => 
    onSnapshot(
      query(collection(db, 'posts'), 
      orderBy('timestamp', 'desc')), 
      snapshot => {
        let arr: any = [];
        snapshot.docs.map(sp => {
          arr.push(sp.data());
        })
        setPosts(arr);
        setPostsFromDB(arr);
      }), 
  [db]);

  useEffect(() => {

    const updatedPosts = postsFromDB.filter(post => post.genre === currentGenre);

    setPosts(updatedPosts);

  }, [currentGenre])

  return (
    <div className=''>
      {
        posts.map((post: postInterface) => {
          return (
            <Post 
              id={post.id} 
              userName={post.userName} 
              userImg={post.userImg} 
              img={post.img} 
              title={post.title}
              review={post.review}
              genre={post.genre}
              type={post.type}
              rating={post.rating}
              crowdRating={post.crowdRating}
              timestamp={post.timestamp}
            />
          )
        })
      }
    </div>
  )
}



export default Posts

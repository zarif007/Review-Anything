import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'
import postInterface from './../interfaces/Post';
import { useRecoilState } from 'recoil';
import { selectedGenre } from '../atoms/genreAtom';
import axios from 'axios';


const getPosts = async () => {
  const data = await axios.get('http://localhost:3000/api/posts');

  return data
}

export async function getServerSideProps() {
  
  const data = await getPosts();
  
  return {
    props: {
      data: 1,
    }
  }
}


const Posts: React.FC<any> = ({ data }) => {
  
  const [posts, setPosts] = useState<postInterface[]>([]);

  const [postsFromDB, setPostsFromDB] = useState<postInterface[]>([]);

  const [currentGenre] = useRecoilState<string>(selectedGenre);

  useEffect(() => {
    console.log(data);
  }, [])

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

    let updatedPosts: postInterface[] = [];

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

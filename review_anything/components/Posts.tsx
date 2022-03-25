import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Post from './Post'
import postInterface from './../interfaces/Post';


// const posts: postInterface[]  = [
//   {
//     id: '1',
//     userName: 'AKA',
//     userImg: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',
//     img: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',
//     title: 'ooooo',
//     review: 'kire?',
//     genre: 'Girlfriend 👧',
//     type: 'non-paid',
//     rating: '4',
//     crowdRating: '3.7',
//     timestamp: new Date()
//   },
//   {
//     id: '2',
//     userName: 'llll',
//     userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
//     img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
//     title: 'ooooo',
//     review: 'kirdadasdase?',
//     genre: 'Girlfriend 👧',
//     type: 'non-paid',
//     rating: '4',
//     crowdRating: '3.7',
//     timestamp: new Date()
//   },
//   {
//     id: '3',
//     userName: 'dsadasd',
//     userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
//     img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
//     title: 'ooooo',
//     review: 'kirdsaddsadsadsadasdasd d dsa dsadasd dsad dasd d adasdasdasdsad  ? ',
//     genre: 'Girlfriend 👧',
//     type: 'non-paid',
//     rating: '4',
//     crowdRating: '3.7',
//     timestamp: new Date()
//   },
// ]

const Posts: React.FC = () => {

  const [posts, setPosts] = useState<any>([]);

  useEffect(() => 
    onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')), snapshot => {
      setPosts(snapshot.docs);
    }), [db]);

  console.log(posts);

  return (
    <div className=''>
      {
        posts.map((post: any) => {
          return (
            <Post 
              key={post.id} 
              id={post.id} 
              userName={post.data().userName} 
              userImg={post.data().userImg} 
              img={post.data().img} 
              title={post.data().title}
              review={post.data().review}
              genre={post.data().genre}
              type={post.data().type}
              rating={post.data().rating}
              crowdRating={post.data().crowdRating}
              timestamp={post.data().timestamp}
            />
          )
        })
      }
    </div>
  )
}

export default Posts

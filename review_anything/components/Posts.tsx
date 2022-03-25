import React from 'react'
import postInterface from '../interfaces/Post'
import Post from './Post'


const posts: postInterface[]  = [
  {
    id: '1',
    userName: 'AKA',
    userImg: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',
    img: 'https://www.pictureframesexpress.co.uk/blog/wp-content/uploads/2020/05/7-Tips-to-Finding-Art-Inspiration-Header-1024x649.jpg',
    title: 'ooooo',
    caption: 'kire?',
    genre: 'Girlfriend 👧',
    type: 'non-paid',
    rating: '4',
    crowdRating: '3.7',
  },
  {
    id: '2',
    userName: 'llll',
    userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    title: 'ooooo',
    caption: 'kirdadasdase?',
    genre: 'Girlfriend 👧',
    type: 'non-paid',
    rating: '4',
    crowdRating: '3.7',
  },
  {
    id: '3',
    userName: 'dsadasd',
    userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    title: 'ooooo',
    caption: 'kirdsaddsadsadsadasdasd d dsa dsadasd dsad dasd d adasdasdasdsad  ? ',
    genre: 'Girlfriend 👧',
    type: 'non-paid',
    rating: '4',
    crowdRating: '3.7',
  },
]

const Posts: React.FC = () => {
  return (
    <div className=''>
      {
        posts.map(post => {
          return (
            <Post 
              key={post.id} 
              id={post.id} 
              userName={post.userName} 
              userImg={post.userImg} 
              img={post.img} 
              title={post.title}
              caption={post.caption}
              genre={post.genre}
              type={post.type}
              rating={post.rating}
              crowdRating={post.crowdRating}
            />
          )
        })
      }
    </div>
  )
}

export default Posts

import React from 'react'
import postInterface from '../interfaces/Post'
import Post from './Post'


const posts: postInterface[]  = [
  {
    id: '1',
    userName: 'AKA',
    userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    caption: 'kire?'
  },
  {
    id: '2',
    userName: 'llll',
    userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    caption: 'kirdadasdase?'
  },
  {
    id: '3',
    userName: 'dsadasd',
    userImg: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    img: 'https://cdn.britannica.com/87/2087-004-264616BB/Mona-Lisa-oil-wood-panel-Leonardo-da.jpg',
    caption: 'kirdsaddsadsadsadasdasd d dsa dsadasd dsad dasd d adasdasdasdsad  ? '
  },
]

const Posts : React.FC = () => {
  return (
    <div className=''>
      {
        posts.map(post => {
          return (
            <Post key={post.id} id={post.id} userName={post.userName} userImg={post.userImg} img={post.img} caption={post.caption} />
          )
        })
      }
    </div>
  )
}

export default Posts

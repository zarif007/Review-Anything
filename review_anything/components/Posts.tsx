import React from 'react'
import postInterface from '../interfaces/Post'
import Post from './Post'


const posts: postInterface[]  = [
  {
    id: '1',
    userName: 'AKA',
    userImg: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
    img: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
    caption: 'kire?'
  },
  {
    id: '2',
    userName: 'llll',
    userImg: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
    img: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
    caption: 'kirdadasdase?'
  },
  {
    id: '3',
    userName: 'dsadasd',
    userImg: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
    img: 'https://image.binance.vision/editor-uploads-original/9c15d9647b9643dfbc5e522299d13593.png',
    caption: 'kirdsadasdsae?'
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

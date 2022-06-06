import React from 'react'
import postInterface from '../interfaces/Post'
import Pool from './Pool'
import Posts from './Posts'
import RefreshPage from './RefreshPage'
import Trending from './Trending'

const Feed: React.FC<{ posts: postInterface[] }> = ( { posts } ) => {
  return (
    <main className='text-white flex mx-auto max-w-6xl justify-around'>
      <section className='sm:w-full md:w-4/6 '> 
        <Posts posts={posts} />
      </section>
      <section className='hidden md:flex w-2/6 pt-6 flex-col'>
        <div className='mb-2'>
            <Pool />
        </div>
        <div className='mb-4'>
          <Trending />
        </div>
        {/* <div className='mr-2'>
          <RefreshPage />
        </div> */}
      </section>
    </main>
  )
}

export default Feed

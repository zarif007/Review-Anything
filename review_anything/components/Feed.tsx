import React from 'react'
import Pool from './Pool'
import Posts from './Posts'
import Trending from './Trending'

const Feed: React.FC = () => {
  return (
    <main className='text-white flex mx-auto max-w-6xl justify-around'>
      <section className='sm:w-full md:w-4/6'> 
        <Posts />
      </section>
      <section className='hidden md:flex w-2/6 pt-6 flex-col'>
        <div className='mb-4'>
          <Pool />
        </div>
        <div className=''>
          <Trending />
        </div>
      </section>
    </main>
  )
}

export default Feed

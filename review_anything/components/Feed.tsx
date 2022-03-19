import React from 'react'
import Posts from './Posts'

const Feed: React.FC = () => {
  return (
    <main className='text-white flex mx-auto max-w-6xl'>
      <section className='sm:w-full md:w-4/6'> 
        <Posts />
      </section>
      <section className='hidden md:inline w-2/6 pt-12'>
        <div className='bg-gray-900 w-full'>
          hio
        </div>
      </section>
    </main>
  )
}

export default Feed

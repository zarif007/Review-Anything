import React from 'react'
import Posts from './Posts'

const Feed: React.FC = () => {
  return (
    <main className='text-white grid grid-cols-1 md:grid-cols-2 md:mx-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto max-w-7xl'>
      <section> 
        <Posts />
      </section>
      <section>
        <Posts />
      </section>
    </main>
  )
}

export default Feed

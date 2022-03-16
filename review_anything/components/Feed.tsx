import React from 'react'
import Posts from './Posts'

const Feed = () => {
  return (
    <main className='text-white grid grid-cols-1 md:grid-cols-2 md:mx-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto'>
      <section>
        <h1>1</h1>
        <Posts />
      </section>
      <section>
        <h1>3</h1>
        <h1>4</h1>
      </section>
    </main>
  )
}

export default Feed

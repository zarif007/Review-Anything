import type { NextPage } from 'next'
import Head from 'next/head'
import BottomNav from '../components/BottomNav'
import Feed from '../components/Feed'
import Header from '../components/Header'


const Home: NextPage = () => {
  return (
    <div className='min-h-screen bg-[#0E0E10]'>
      <Head>
        <title>RAT</title>
        <meta name="description" content="Review Anything" />
        <link rel="icon" href="/sm_logo.ico" />
      </Head>
      <Header />

        {/* 
        Dark => 
          BG -> #0E0E10
          POST -> #131313
          SHADOW -> black
          border -> bg-gray-900

        Light => 
          BG -> white
          POST -> #FAF9F6
          Shadow -> #a1a1aa
        */}

      {/* <div className='font-bold text-5xl text-white flex flex-col lg:flex-row   flex-wrap'>
        <div className='bg-gray-900 p-3 rounded-md  mx-auto m-2 border-blue-600 border-2 w-1/6'>Hi</div>
        <div className='bg-[#0f0f0f] shadow-md shadow-[#060809] p-3 rounded-md  mx-auto m-2  w-1/6'>Helddddddso</div>
        <div className='p-3 rounded-md  mx-auto m-2  w-3/6 flex flex-col'>
          <h1 className='bg-[#0c1012] border-2 border-[#1f2937] m-4'>hiiiiii</h1>
          <h1 className='bg-[#0c1012] border-2 border-[#1f2937] m-4'>hiiiiii</h1>
          <h1 className='bg-[#0c1012] border-2 border-[#1f2937] m-4'>hiiiiii</h1>
          <h1 className='bg-[#0c1012] border-2 border-[#1f2937] m-4'>hiiiiii</h1>
        </div>
        
        
      </div> */}
      <Feed />
      <div className='inline md:hidden'>
        <BottomNav />
      </div>
    </div>
  )
}

export default Home

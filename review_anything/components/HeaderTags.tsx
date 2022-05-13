import Head from 'next/head'
import React from 'react'

const HeaderTags: React.FC<{ title: string, content: string }> = ({ title, content }) => {

  return (
    <Head>
      <title>{title}</title>
      <meta name={title} content={content} />
      <link rel="icon" href="/sm_logo.ico" />
    </Head>
  )
}

export default HeaderTags

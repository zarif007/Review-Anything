import { useRouter } from 'next/router'
import React from 'react'

const RefreshPage = () => {
  const router = useRouter();

  return (
    <div className="fixed">
      <button className="w-96 bg-blue-500 rounded-sm py-2 font-semibold"
        onClick={() => router.replace(router.asPath)}>
        Refresh Page
      </button>
    </div>
  );
}

export default RefreshPage

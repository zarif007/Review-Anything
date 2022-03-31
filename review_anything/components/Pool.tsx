import React, { useState } from 'react'
import { objects } from '../objects'

const Pool: React.FC = () => {

  const [objs, setObjs] = useState(objects);
  
  const styles = {
    wrapper: 'bg-slate-900 bg-opacity-25 border-2 border-gray-900 rounded-sm mr-2',
    objWrapper: 'flex flex-wrap p-2',
    object: 'bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white',
    showMoreButton: 'text-blue-500 text-md font-semibold cursor-pointer pt-3 pl-2',
  }

  const handleSearch = (e: any) => {
    const updatedObjs = objects.filter(object => object.value.toLowerCase().includes(e.target.value.toLowerCase()));

    setObjs(updatedObjs);
  }

  return (
    <div className={styles.wrapper}>
      <div className='mx-auto p-3 '>
        <input 
          className='p-1 w-full focus:outline-none ring-2 bg-black rounded-sm' 
          placeholder='Search...' 
          onChange={handleSearch}  
        />
      </div>
      <div className={styles.objWrapper}>
        {
          objs.map(obj => {
            return (
              <div className={styles.object} >{obj.value}</div>
            )
          })
        }
        <p className={styles.showMoreButton}>Show more...</p>
      </div>
    </div>
  )
}

export default Pool

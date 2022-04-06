import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import { poolModalState } from '../atoms/poolModalAtom';
import { theme } from '../atoms/themeAtom';
import { objects } from '../objects'
import { selectedGenre } from './../atoms/genreAtom';

const Pool: React.FC = () => {

  const [objs, setObjs] = useState<{value: string, label: string}[]>(objects);

  const [isDark] = useRecoilState(theme);

  const [currentGenre, setCurrentGenre] = useRecoilState<string>(selectedGenre);

  const [open, setOpen] = useRecoilState<boolean>(poolModalState);
  
  const styles = {
    wrapper: `${isDark ? 'bg-slate-900 border-gray-900' : 'bg-blue-200 border-blue-100'} bg-opacity-25 border-2 rounded-sm mr-2`,
    objWrapper: `flex flex-wrap p-2`,
    object: `bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white`,
    showMoreButton: `text-blue-500 text-md font-semibold cursor-pointer pt-3 pl-2`,
    input: `p-1 w-full focus:outline-none ${isDark ? 'bg-black text-white' : 'bg-gray-100 text-black'} rounded-sm font-semibold` ,
  }

  const handleSearch = (e: any) => {
    setObjs([]);
    
    const updatedObjs = objects.filter(object => object.value.toLowerCase().includes(e.target.value.toLowerCase()));

    setObjs(updatedObjs);
  }

  return (
    <div className={styles.wrapper}>
      <div className='mx-auto p-3 '>
        <input 
          className={styles.input}
          placeholder='Search...' 
          onChange={handleSearch}  
        />
      </div>
      <div className={styles.objWrapper}>
        {
          objs.slice(0, 20).map((obj, index) => {
            return (
              <div 
                className={styles.object} 
                key={index} 
                onClick={() => setCurrentGenre(obj.value)}
              >
                {obj.value}
              </div>
            )
          })
        }
        <p className={styles.showMoreButton}
        onClick={() => setOpen(true)} >
          Show more...
        </p>
      </div>
    </div>
  )
}

export default Pool

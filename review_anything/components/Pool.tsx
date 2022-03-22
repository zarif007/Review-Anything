import React from 'react'


const objects: string[] = ['Animal 🐘', 'Cat 🐱', 'Dog 🐶', 'Person 🧍', 
  'Couple 🧑🏻‍🤝‍🧑🏻', 'Group 👨‍👩‍👧‍👧', 'Toilet 🚽', 'Hotel 🛏️', 'Girlfriend 👧', 'BoyFriend 👦', 
  'Company 🏢', 'House 🏠',
  'Couple 🧑🏻‍🤝‍🧑🏻', 'Group 👨‍👩‍👧‍👧', 'Toilet 🚽', 'Hotel 🛏️', 'Girlfriend 👧', 'BoyFriend 👦', 
  'Company 🏢', 'House 🏠',
  'Couple 🧑🏻‍🤝‍🧑🏻', 'Group 👨‍👩‍👧‍👧', 'Toilet 🚽', 'Hotel 🛏️', 'Girlfriend 👧', 'BoyFriend 👦', 
  'Company 🏢', 'House 🏠'];

const Pool: React.FC = () => {
  
  const styles = {
    wrapper: 'bg-slate-900 bg-opacity-25 border-2 border-gray-900 rounded-sm mr-2',
    objWrapper: 'flex flex-wrap p-2',
    object: 'bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white',
    showMoreButton: 'text-blue-500 text-md font-semibold cursor-pointer pt-3 pl-2',
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.objWrapper}>
        {
          objects.map(object => {
            return (
              <div className={styles.object} >{object}</div>
            )
          })
        }
        <p className={styles.showMoreButton}>Show more...</p>
      </div>
      
    </div>
  )
}

export default Pool

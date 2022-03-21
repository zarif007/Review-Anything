import React from 'react'


const objects: string[] = ['Animal 🐘', 'Cat 🐱', 'Dog 🐶', 'Person 🧍', 
  'Couple 🧑🏻‍🤝‍🧑🏻', 'Group 👨‍👩‍👧‍👧', 'Toilet 🚽', 'Hotel 🛏️', 'Girlfriend 👧', 'BoyFriend 👦', 
  'Company 🏢', 'House 🏠',
  'Couple 🧑🏻‍🤝‍🧑🏻', 'Group 👨‍👩‍👧‍👧', 'Toilet 🚽', 'Hotel 🛏️', 'Girlfriend 👧', 'BoyFriend 👦', 
  'Company 🏢', 'House 🏠',
  'Couple 🧑🏻‍🤝‍🧑🏻', 'Group 👨‍👩‍👧‍👧', 'Toilet 🚽', 'Hotel 🛏️', 'Girlfriend 👧', 'BoyFriend 👦', 
  'Company 🏢', 'House 🏠'];

const Pool = () => {
  return (
    <div className='bg-slate-900 bg-opacity-25 border-2 border-gray-900 rounded-sm mr-2'>
      <div className='flex flex-wrap p-2'>
        {
          objects.map(object => {
            return (
              <div className='bg-blue-500 hover:bg-blue-600 p-2 m-1 rounded-2xl font-semibold text-sm iconAnimation hover:text-white' >{object}</div>
            )
          })
        }
        <p className='text-blue-500 text-md font-semibold cursor-pointer pt-3 pl-2'>Show more...</p>
      </div>
      
    </div>
  )
}

export default Pool

import React from 'react'
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { theme } from '../atoms/themeAtom';
import commentInterface from '../interfaces/Comment';

const Comment: React.FC<{ postComment: commentInterface}> = ({ postComment }) => {

  const [isDark] = useRecoilState(theme);

  const styles = {
    commentWrapper: `flex flex-col p-2 pb-1 mt-2`,
    userDp: `h-6 w-6 sm:h-8 sm:w-8 sm:h-14 sm:w-14 rounded-full pt-2 object-contain`,
    userName: `font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'} text-md lg:text-xl uppercase`,
    timestamp: `text-xs text-gray-400 sm:flex items-center sm:space-x-1 xs:flex-col`,
    comment: `flex items-center pl-1 text-lg ${isDark ? 'text-white' : 'text-black'} font-semibold`,
  }

  const { user, timestamp, comment  } = postComment;
 
  return (
    <div className={styles.commentWrapper} >
        <div className='flex space-x-2 items-center pb-2 cursor-pointer'>
            <img src={user.image} className={styles.userDp} />
            <p className={styles.userName}>{user.username}</p>
            <p className={styles.timestamp}>
              <Moment toNow ago>
                {timestamp?.toDate().toISOString()}
              </Moment>
              <span> ago</span>
            </p>
        </div>
        
        <div className={styles.comment}>
            <p>
              {
                comment.split('\n').map(cm => {
                  return (
                    <div>
                      {cm}
                    </div>
                  )
                })
              }
            </p>
        </div>
    </div>
  )
}

export default Comment

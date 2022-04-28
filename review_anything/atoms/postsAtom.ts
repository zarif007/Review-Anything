import { atom } from "recoil";

export const postsState = atom({
    key: 'postsState',
    default: [
        {
            user: {
              username: '',
              email: '',
              image: ''
            },
            img: '',
            title: '',
            review: '',
            genre: '',
            type: '',
            rating: '',
            interactions: {
              approvedBy: '',
              crowdRatings: '',
            }
          }
    ], 
})
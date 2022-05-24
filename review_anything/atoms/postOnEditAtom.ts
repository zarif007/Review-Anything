import { atom } from "recoil";
import postInterface from "../interfaces/Post";


const postFormat: postInterface = {
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
      approvedBy: [],
      crowdRatings: [],
    }
}

export const postOnEditState = atom({
    key: 'postOnEditState',
    default: postFormat,
})
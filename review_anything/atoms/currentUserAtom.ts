import { atom } from "recoil";

export const currentUser = atom({
    key: 'currentUser',
    default: {
        theme: true,
        _id: '',
        image: '',
        preference: [],
        name: '',
        email: '',
    }, 
})
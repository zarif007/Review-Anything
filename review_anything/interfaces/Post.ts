export default interface postInterface {
  _id?: string,
  user: {
    _id: string,
    email: string,
    username: string,
    image: string, 
  },
  img: string,
  title: string,
  review: string,
  genre: string,
  type: string,
  rating: string,
  interactions: {
    approvedBy: string[],
    crowdRatings: object[],
  }
  createdAt?: any,
}
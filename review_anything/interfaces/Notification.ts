export default interface NotificationInterface {
    id?: string,
    message: string,
    post: {
        _id?: string,
        user: {
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
    },
    status: string,
    timestamp: any,
  }
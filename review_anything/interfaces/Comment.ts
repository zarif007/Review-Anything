export default interface commentInterface {
    user: {
      _id: string,
      email: string,
      username: string,
      image: string, 
    },
    comment: string,
    postId: string,
    timestamp?: any,
  }
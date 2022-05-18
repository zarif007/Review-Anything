export default interface commentInterface {
    user: {
      email: string,
      username: string,
      image: string, 
    },
    comment: string,
    postId: string,
    timestamp?: any,
  }
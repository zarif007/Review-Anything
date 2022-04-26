import Post from '../../../models/Post'
import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'



dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;
    
    const {user, img, title, review, genre, type, rating, crowdRating} = req.body;
        
    switch(method){
        case 'GET':
            try{
                const posts = await Post.find({});
                res.status(200).json({ success: true, data: posts })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            try{
                const post = await Post.create({user, img, title, review, genre, type, rating, crowdRating});
                res.status(201).json({ success: true, data: post })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}

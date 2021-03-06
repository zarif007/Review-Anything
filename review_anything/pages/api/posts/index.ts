import Post from '../../../models/Post'
import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'



dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    const {user, img, title, review, genre, type, rating, interactions} = req.body;
        
    switch(method){
        case 'GET':
            try{
                const posts = await Post.find().sort({_id:-1});
                res.status(200).json({ success: true, data: posts })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            console.log(req.body)
            try{
                const post = await Post.create({user, img, title, review, genre, type, rating, interactions});
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

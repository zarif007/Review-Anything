import Post from '../../../models/Post'
import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'



dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    switch(method){
        case 'GET':
            try{
                const posts = await Post.find().sort({_id:-1}).limit(3);
                res.status(200).json({ success: true, data: posts })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}

import Post from '../../../models/Post'
import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'
import postInterface from '../../../interfaces/Post';



dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    switch(method){
        case 'GET':
            try{
                const posts = await Post.find().sort({_id:-1});

                posts.sort((a: postInterface, b: postInterface): number => {
                    const aSum = a.interactions.approvedBy.length + a.interactions.crowdRatings.length;
                    const bSum = b.interactions.approvedBy.length + b.interactions.crowdRatings.length;

                    if(aSum > bSum) return -1;
                    else if(aSum < bSum) return 1;

                    return 0;
                });

                res.status(200).json({ success: true, data: posts.slice(0, 3) })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}

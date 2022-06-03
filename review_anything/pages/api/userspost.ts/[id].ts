import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/Post'
import type { NextApiRequest, NextApiResponse } from 'next'

dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {

    const { query: { id }, method } = req;

    switch (method) {
        case 'GET':
            try {
                const posts = await Post.find({ 'user._id': id })

                res.status(200).json({ success: true, data: posts });
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
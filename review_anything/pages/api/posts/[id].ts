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
                const post = await Post.findById(id);

                if (!post) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: post });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const post = await Post.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!post) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: post });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedpost = await Post.deleteOne({ _id: id });

                if (!deletedpost) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}
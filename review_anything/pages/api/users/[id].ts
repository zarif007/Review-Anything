import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User'
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
                const user = await User.find({email: id});

                if (!user) {
                    return res.status(400).json({ success: false });
                }

                const usersPost = await Post.find({email: id});
                res.status(200).json({ success: true, data: user, posts: usersPost });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const user = await User.updateOne({email: id}, {$set: req.body}, {
                    new: true,
                    runValidators: true
                });
                
                if (!user) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedpost = await User.deleteOne({ _id: id });

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
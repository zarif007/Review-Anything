import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User';


dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    const user = req.body;

    try{
        const result = await User.updateOne({email: user.email}, {$set: user}, { upsert: true });
        res.status(201).json({ success: true, data: result })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}

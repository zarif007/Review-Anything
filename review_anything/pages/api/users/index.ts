import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User';


dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    const { name, email, image, username } = req.body;
    const preference: string[] = [];

    try{
        const user = await User.updateOne({ name, email, image, username, preference }, { upsert: true });
        res.status(201).json({ success: true, data: user })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}

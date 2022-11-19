import Car from '../../../models/Cars'
import dbConnect from './../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next'


dbConnect();

export default async (
    req: NextApiRequest,
    res: NextApiResponse) => {
        
    const { method } = req;

    const {brand, model, owner} = req.body;
        
    switch(method){
        case 'GET':
            try{
                const posts = await Car.find().sort({_id:-1});
                res.status(200).json({ success: true, data: posts })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'POST':
            console.log(req.body)
            try{
                const post = await Car.create({brand, model, owner});
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

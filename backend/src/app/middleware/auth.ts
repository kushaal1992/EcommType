import { Request, Response, NextFunction} from 'express';
import { verify } from 'jsonwebtoken';

export function validateUser(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token']
    const private_key = process.env.PRIVATE_KEY || ''
    verify(token, private_key, (err: any, decoded: any) => {
        if(err){
            res.status(400).json({status: 'failed', message: 'Your session is expired', data: null})
        } else {
            console.log(decoded)
            req.body.userId = decoded.id
            next()
        }
    })
}
import { Request, Response, NextFunction, Errback } from 'express';
import { User } from '../models/user';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

export class UserController {
    static login(req: Request, res: Response, next: NextFunction) {
        const private_key = process.env.PRIVATE_KEY || ''
        User.findOne({ email: req.body.email }, (err: Errback, doc: any) => {
            if (err) {
                res.json({ status: 'Login failed!', message: err })
            } if (doc != undefined) {
                if (compareSync(req.body.password, doc.password)) {
                    const token = sign({ id: doc._id }, private_key, { expiresIn: '1h' })
                    res.json({ status: 'Logged in!', message: 'You can browse', data: token })
                } else {
                    res.json({ status: 'Login failed!', message: 'Username or pwd is incorrect' })
                }
            } else {
                res.json({ status: 'Login failed!', message: 'Username or pwd is incorrect' })
            }
        })
    }

    static registration(req: Request, res: Response, next: NextFunction) {
        const user = new User(req.body)
        User.create(user, (err: Errback, result: any) => {
            if (err) {
                console.log(err)
                res.json({ status: 'failed!', message: err })
            } else {
                res.json({ status: 'success', message: 'Registered!', data: result })
            }
        })

    }


    static updateProfile(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        const userId = req.body.userId
        User.findByIdAndUpdate(userId, {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address
            }
        }, (err: Errback, result: any) => {
            if(err) {
                res.status(400).json({status: 'User not found!', message: err})
            } else {
                res.json({status:'Success', message: 'Updated!'})
            }
        })
    }

    static getProfile(req: Request, res: Response, next: NextFunction) {
        const userId = req.body.userId
        User.findById(userId, (err: Errback, result: any) => {
            if(err) {
                console.log(err)
                res.status(401).json({status: 'failed!', message: err})
            } else {
                res.json({status: 'success', message: 'Users found', data: result})
            }
        })
    }

}
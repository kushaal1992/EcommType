import { UserController } from '../controllers/userController';
import * as express from  'express';
import { validateUser } from '../middleware/auth';

export const userRoute = express.Router();

userRoute.post('/login', UserController.login)
userRoute.post('/register', UserController.registration)
userRoute.put('/', validateUser, UserController.updateProfile)
userRoute.get('/', validateUser, UserController.getProfile)
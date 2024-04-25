import { Router } from 'express';
import {
	signup,
	login,
	getUser,
	protect,
	// matchOTP
} from '../controllers/user.controllers';

export const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/login').post(login);
router.route('/').get(protect, getUser);

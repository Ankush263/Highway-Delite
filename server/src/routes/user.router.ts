import { Router } from 'express';
import {
	signup,
	login,
	getUser,
	protect,
	matchOTP,
	getOTP,
} from '../controllers/user.controllers';

export const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/matchOTP').post(protect, matchOTP);
router.route('/getOTP').post(protect, getOTP);
router.route('/').get(protect, getUser);

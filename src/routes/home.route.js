import { Router } from 'express';

import auth from '../middleware/auth';
import HomeController from '../controllers/home.controller';
import catchAsyncErrors from '../middleware/catch-async-errors';

const router = Router();

router
	.route('/')
	.get(auth, catchAsyncErrors(HomeController.renderHompage));

export { router as homeRoute };

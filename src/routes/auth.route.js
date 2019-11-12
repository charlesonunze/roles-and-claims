import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import catchAsyncErrors from '../middleware/catch-async-errors';

const router = Router();

router
	.route('/signup')
	.get(catchAsyncErrors(AuthController.renderSignupPage))
	.post(catchAsyncErrors(AuthController.registerUser));

router
	.route('/login')
	.get(catchAsyncErrors(AuthController.renderLoginPage))
	.post(catchAsyncErrors(AuthController.loginUser));

export { router as authRoute };

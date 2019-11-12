import { Router } from 'express';
import rcController from '../controllers/rc.controller';
import catchAsyncErrors from '../middleware/catch-async-errors';

const router = Router();

router
	.route('/roles')
	.post(catchAsyncErrors(rcController.createRole))
	.delete(catchAsyncErrors(rcController.deleteRole));

router
	.route('/claims')
	.post(catchAsyncErrors(rcController.createClaim))
	.delete(catchAsyncErrors(rcController.deleteClaim));

router
	.route('/rc')
	.post(catchAsyncErrors(rcController.addClaimToRole))
	.delete(catchAsyncErrors(rcController.deleteClaimFromRole));

export { router as rcRoute };

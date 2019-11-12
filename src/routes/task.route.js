import { Router } from 'express';

import auth from '../middleware/auth';
import hasClaim from '../middleware/hasClaim';
import TaskController from '../controllers/task.controller';
import catchAsyncErrors from '../middleware/catch-async-errors';

const router = Router();

router
	.route('/tasks')
	.post(
		[auth, hasClaim('create_todo')],
		catchAsyncErrors(TaskController.create_task)
	)
	.delete(
		[auth, hasClaim('delete_todo')],
		catchAsyncErrors(TaskController.delete_task)
	);

export { router as taskRoute };

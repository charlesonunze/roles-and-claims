import { Task } from '../models/task';

import sendResponse from '../utils/response';
import { TaskError } from '../utils/error';

class TaskController {
	static async create_task(req, res) {
		const { title } = req.body;

		let task = await Task.findOne({ title });

		if (task)
			throw new TaskError(400, 'A task with a similar title exists.');

		task = new Task({ title, author: req.user._id });
		await task.save();

		sendResponse(res, task, 'task created.');
	}

	static async delete_task(req, res) {
		const { title } = req.body;
		let task = await Task.findOneAndDelete({ title });

		sendResponse(res, task, 'Role deleted.');
	}
}

export default TaskController;

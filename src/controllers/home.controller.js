import { Task } from '../models/task';

class HomeController {
	static async renderHompage(req, res) {
		let tasks = await Task.find({ author: req.user._id });
		res.render('index', {
			tasks,
			currentDate: Date.now()
		});
	}
}

export default HomeController;

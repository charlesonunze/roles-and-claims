import { authRoute } from '../routes/auth.route';
import { homeRoute } from '../routes/home.route';
import { taskRoute } from '../routes/task.route';
import { rcRoute } from '../routes/rc.route';

export default function(app) {
	app.use('/', authRoute);
	app.use('/', taskRoute);
	app.use('/', rcRoute);
	app.use('/home', homeRoute);
}

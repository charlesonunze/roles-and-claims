import mongoose from 'mongoose';
import { DB_URI } from '../config';

const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
};

export default function() {
	mongoose
		.connect(DB_URI, options)
		.then(_ => console.log(`Connected to ${DB_URI}`))
		.catch(e => {
			console.log('DB connection failed.\n', e);
		});
}

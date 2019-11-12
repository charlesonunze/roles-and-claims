import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	role: {
		type: String,
		default: 'user',
		enum: ['admin', 'user']
	}
});

const User = mongoose.model('User', userSchema);

export { User };

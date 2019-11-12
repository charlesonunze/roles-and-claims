import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
	title: {
		trim: true,
		type: String,
		required: true
	},

	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

	createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

export { Task };

import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema({
	name: {
		type: String,
		enum: ['create_todo', 'read_todo', 'update_todo', 'delete_todo']
	}
});

const Claim = mongoose.model('Claim', claimSchema);

export { Claim };

import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
	name: {
		type: String,
		enum: ['admin', 'user']
	},
	claims: [String]
});

const Role = mongoose.model('Role', roleSchema);

export { Role };

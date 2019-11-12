import { Role } from '../models/role';

export default function(claim) {
	return async function(req, res, next) {
		let role = await Role.findOne({ name: req.user.role });
		if (role.claims.includes(claim)) {
			console.log('YES');
			next();
		} else {
			console.log('NO');
			// next();
			res.json({
				error: `You do not have the right permissions to do this.`
			});
		}
	};
}

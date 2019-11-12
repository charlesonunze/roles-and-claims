import { Role } from '../models/role';
import { Claim } from '../models/claim';

import sendResponse from '../utils/response';
import { RCError, NotFoundError } from '../utils/error';

class rcController {
	static async createRole(req, res) {
		const { name } = req.body;

		let role = await Role.findOne({ name });

		if (role)
			throw new RCError(400, 'A role with a similar name exists.');

		role = new Role({ name });
		await role.save();

		sendResponse(res, role, 'Role created.');
	}

	static async deleteRole(req, res) {
		const { name } = req.body;

		let role = await Role.findOneAndDelete({ name });

		if (!role) throw new NotFoundError(404, 'Role not found.');

		sendResponse(res, role, 'Role deleted.');
	}

	static async createClaim(req, res) {
		const { name } = req.body;

		let claim = await Claim.findOne({ name });

		if (claim)
			throw new RCError(400, 'A claim with a similar name exists.');

		claim = new Claim({ name });
		await claim.save();

		sendResponse(res, claim, 'Claim created.');
	}

	static async deleteClaim(req, res) {
		const { name } = req.body;

		let claim = await Claim.findOneAndDelete({ name });

		if (!claim) throw new NotFoundError(404, 'Claim not found.');

		sendResponse(res, claim, 'Claim deleted.');
	}

	static async addClaimToRole(req, res) {
		const { claimName, roleName } = req.body;

		let role = await Role.findOne({ name: roleName });
		if (!role) throw new NotFoundError(404, 'Role does not exist.');

		if (role.claims.includes(claimName))
			throw new RCError(400, 'Claim already exists in this role.');

		let claim = await Claim.findOne({ name: claimName });

		if (!claim) throw new NotFoundError(404, 'Claim does not exist.');

		role.claims.push(claim.name);
		await role.save();

		sendResponse(res, role, 'Claim added to Role.');
	}

	static async deleteClaimFromRole(req, res) {
		const { claimName, roleName } = req.body;

		let role = await Role.findOne({ name: roleName });
		let claim = await Claim.findOne({ name: claimName });

		if (!role) throw new NotFoundError(404, 'Role does not exist.');
		if (!claim) throw new NotFoundError(404, 'Claim does not exist.');

		role.claims = role.claims.filter(claim => claim !== claimName);
		await role.save();

		sendResponse(res, role, 'Claim removed from Role.');
	}
}

export default rcController;

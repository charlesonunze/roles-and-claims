import { genSalt, hash, compare } from 'bcryptjs';
import { User } from '../models/user';

class UserAuth {
	static async renderSignupPage(req, res) {
		res.render('signup');
	}

	static async renderLoginPage(req, res) {
		res.render('login');
	}

	static async registerUser(req, res) {
		let { email } = req.body;
		let redirect_url = '/signup';

		let user = await User.findOne({ email });
		if (user) {
			req.flash(
				'error',
				'This e-mail is already registered on this platform.'
			);
			return res.redirect(redirect_url);
		}

		user = new User(req.body);
		await user.save();

		req.session.isLoggedIn = true;
		req.session.user = user;
		req.session.save(_ => res.redirect('/home'));
	}

	static async loginUser(req, res) {
		let { email, password } = req.body;
		const redirect_url = '/login';

		const user = await User.findOne({ email });
		if (!user) {
			req.flash('error', 'Invalid email or password.');
			return res.redirect(redirect_url);
		}

		if (password !== user.password) {
			req.flash('error', 'Invalid email or password.');
			return res.redirect(redirect_url);
		}

		req.session.isLoggedIn = true;
		req.session.user = user;
		req.session.save(_ => res.redirect('/home'));
	}

	static async logoutUser(req, res) {
		req.session.destroy();
		return res.redirect('/login');
	}
}

export default UserAuth;

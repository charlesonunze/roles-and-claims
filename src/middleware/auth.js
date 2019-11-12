export default function(req, res, next) {
	if (!req.session.isLoggedIn) {
		req.flash('error', 'Please log in');
		return res.redirect('/login');
	}

	if (!req.session.user) {
		req.flash('error', 'Please log in');
		return res.redirect('/login');
	}

	next();
}

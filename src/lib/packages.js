import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import compression from 'compression';
import connectMongo from 'connect-mongodb-session';

import { join } from 'path';
import express from 'express';
import flash from 'connect-flash';
import session from 'express-session';

const MongoDBStore = connectMongo(session);

import { DB_URI } from '../config';
import { User } from '../models/user';

export default function(app) {
	app.set('views', join(__dirname, '../views'));
	app.set('view engine', 'ejs');

	const store = new MongoDBStore({
		uri: DB_URI,
		collection: 'sessions'
	});

	const corsOptions = {
		credentials: true,
		origin: true,
		optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
	};
	app.use(cors(corsOptions));

	app.use(compression());
	app.use(helmet());

	app.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true
		})
	);
	app.use(bodyParser.json());

	app.use(express.urlencoded({ extended: false }));
	app.use(express.static(join(__dirname, '../public')));
	app.use(
		session({
			secret: 'secret',
			resave: false,
			saveUninitialized: false,
			store: store,
			cookie: {
				maxAge: 3600000
			}
		})
	);

	app.use(flash());

	app.use(async (req, res, next) => {
		if (!req.session.user) return next();

		const user = await User.findById(req.session.user._id);
		req.user = user;
		next();
	});

	app.use((req, res, next) => {
		res.locals.info = req.flash('info');
		res.locals.error = req.flash('error');
		res.locals.errors = req.flash('errors');
		res.locals.success = req.flash('success');
		res.locals.isAuthenticated = req.session.isLoggedIn;
		res.locals.user = req.user || null;
		next();
	});
}

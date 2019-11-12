import expressWinston from 'express-winston';
import { format, transports } from 'winston';
import { handleError, NotFoundError } from '../utils/error';

const { combine, colorize, json, prettyPrint, timestamp } = format;

export default function(app) {
	app.use(
		expressWinston.errorLogger({
			transports: [
				new transports.File({
					filename: 'error.log',
					level: 'silly'
				})
			],
			format: combine(colorize(), json(), prettyPrint(), timestamp())
		})
	);

	// Error Handling
	app.use(function(req, res, next) {
		throw new NotFoundError(404, 'Resource does not exist.');
	});

	app.use((err, req, res, next) => {
		handleError(err, res);
	});
}

export function errorHandler(app) {}

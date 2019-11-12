import express from 'express';

import { PORT } from './config';

import connectDb from './lib/db';
import loadPackages from './lib/packages';
import loadRoutes from './lib/routes';
import handleErrors from './middleware/handle-errors';

const app = express();

connectDb();
loadPackages(app);
loadRoutes(app);
handleErrors(app);

app.listen(PORT, _ => {
	console.log(`Server running on http://localhost:${PORT} `);
});

// export default app;

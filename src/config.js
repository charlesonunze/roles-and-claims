import { config } from 'dotenv';

config();

let PORT;
let DB_URI;

if (process.env.NODE_ENV === 'production') {
	PORT = process.env.PORT;
	DB_URI = process.env.DB_URI;
}

export { PORT, DB_URI };

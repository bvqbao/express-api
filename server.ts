import dotenv from 'dotenv';
import app from './src/app';

dotenv.config();

function startServer() {
	const PORT = Number(process.env.API_SERVER_PORT || 3000);
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}

startServer();

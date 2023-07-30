import morgan from 'morgan';

morgan.token('pid', () => {
	return process.pid.toString();
});

const logger =
	process.env.NODE_ENV === 'production'
		? morgan(
				':pid :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'
		  )
		: morgan('dev');

export default logger;

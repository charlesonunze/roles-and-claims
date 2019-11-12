class AccessError extends Error {
	constructor(statusCode, message) {
		super();
		this.type = 'ACCESS_ERROR';
		this.statusCode = statusCode;
		this.message = message;
	}
}

class RCError extends Error {
	constructor(statusCode, message) {
		super();
		this.type = 'RC_ERROR';
		this.statusCode = statusCode;
		this.message = message;
	}
}

class TaskError extends Error {
	constructor(statusCode, message) {
		super();
		this.type = 'TASK_ERROR';
		this.statusCode = statusCode;
		this.message = message;
	}
}

class NotFoundError extends Error {
	constructor(statusCode, message) {
		super();
		this.type = '404_ERROR';
		this.statusCode = statusCode;
		this.message = message;
	}
}

const handleError = (err, res) => {
	const { type, statusCode, message } = err;
	res.status(statusCode || 500).json({
		type,
		statusCode,
		message
	});
};

export {
	RCError,
	TaskError,
	AccessError,
	NotFoundError,
	handleError
};

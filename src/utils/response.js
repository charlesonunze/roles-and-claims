const sendResponse = (res, data, message) => {
	return res.json({
		message,
		data
	});
};

export default sendResponse;

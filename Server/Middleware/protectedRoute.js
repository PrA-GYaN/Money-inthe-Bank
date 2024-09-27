const jwt = require('jsonwebtoken');

const protectRoute = async (req, res, next) => {
	console.log("Ok");
	const authHeader = req.headers['authorization'];

	if (!authHeader) {
		return res.status(401).json({ message: 'No token provided' });
	}

	const token = authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Access denied. No token provided.' });
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized - Invalid Token" });
		}
		const userId = decoded.uid;
		const user = await Users.findById(userId).select('-password')

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = protectRoute;

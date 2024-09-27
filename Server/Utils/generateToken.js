import { sign } from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
	try {
		const token = sign({ userId }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		});

		res.cookie('jwt', token, {
			maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production', // use secure cookies in production
		});
	} catch (error) {
		console.error('Error generating token:', error);
		// Handle error appropriately (e.g., send a response to the client)
	}
};

export default generateTokenAndSetCookie;

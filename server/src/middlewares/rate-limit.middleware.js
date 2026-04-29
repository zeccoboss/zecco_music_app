const rateLimit = require("express-rate-limit");

/**
 * Reusable rate limit factory.
 * @param {number} windowMinutes
 * @param {number} max
 * @param {string} message
 */
const createLimiter = (windowMinutes, max, message) =>
	rateLimit({
		windowMs: windowMinutes * 60 * 1000,
		max,
		standardHeaders: true, // Return rate limit info in RateLimit-* headers
		legacyHeaders: false, // Disable X-RateLimit-* headers
		handler: (_req, res) => {
			res.status(429).json({ success: false, message });
		},
	});

// 10 attempts per 15 minutes — covers brute force on login
const loginLimiter = createLimiter(
	15,
	10,
	"Too many login attempts. Please try again in 15 minutes.",
);

// 5 attempts per hour — registration shouldn't be hammered
const registerLimiter = createLimiter(
	60,
	5,
	"Too many accounts created from this IP. Please try again in an hour.",
);

// 3 requests per 10 minutes — prevent email spam on forgot password
const forgotPasswordLimiter = createLimiter(
	10,
	3,
	"Too many password reset requests. Please try again in 10 minutes.",
);

module.exports = { loginLimiter, registerLimiter, forgotPasswordLimiter };

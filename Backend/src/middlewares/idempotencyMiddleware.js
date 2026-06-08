const IdempotencyKey = require('../models/IdempotencyKey');

/**
 * Middleware to enforce Idempotency on critical endpoints (POST/PUT).
 * Prevents double-processing of financial transactions.
 */
const idempotency = async (req, res, next) => {
	const key = req.headers['x-idempotency-key'];

	// If no key is provided, we allow it (though we'll require it on the frontend)
	if (!key) {
		return next();
	}

	try {
		// Check if we've seen this key for this user before
		const existingRecord = await IdempotencyKey.findOne({ key, userId: req.user.id });

		if (existingRecord) {
			console.log(`[Idempotency] Duplicate request detected for key: ${key}. Returning cached response.`);
			return res.status(existingRecord.responseStatus).json(existingRecord.responseBody);
		}

		// Patch res.send to capture the response before it's sent
		const originalSend = res.json;
		res.json = function (body) {
			// Save the response for future duplicates
			IdempotencyKey.create({
				key,
				userId: req.user.id,
				responseStatus: res.statusCode,
				responseBody: body,
			}).catch((err) => console.error('[Idempotency] Failed to save key:', err));

			return originalSend.call(this, body);
		};

		next();
	} catch (error) {
		console.error('[Idempotency] Middleware error:', error);
		next();
	}
};

module.exports = idempotency;

import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

export default function auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const apiKey = req.header('x-api-key');
    if (!apiKey)
        return res.status(401).send({
            code: 401,
            message: 'Access denied. API key not provided.',
        });

    try {
        if (apiKey !== process.env.X_API_KEY) {
            throw new Error('Invalid API Key');
        }
        next();
    } catch (err) {
        const typedError = err as Error;
        return res.status(400).send({ code: 400, message: typedError.message });
    }
}

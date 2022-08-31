import request from 'supertest';
import mongoose from 'mongoose';

import { app, server } from '../src/app';

describe('Test app.ts', () => {
    let server: any;
    let agent: request.SuperAgentTest;

    test('Catch-all route', () => {
        return request(app)
            .get('/api/node')
            .then((res) => {
                expect(res.body.message).toEqual(
                    'Access denied. API key not provided.'
                );
            });
    });
});

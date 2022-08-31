import request from 'supertest';
import mongoose from 'mongoose';

import { app, server } from '../src/app';

describe('Test app.ts', () => {
    afterAll((done) => {
        mongoose.connection.close();
        done();
    });
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

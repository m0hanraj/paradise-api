import Joi, { options, Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

const validate = (schema: Schema, property = '') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        console.log('Error', error);
        const valid = error == null;

        if (valid) {
            console.log('VALID');
            next();
        } else {
            const { details } = error || { details: [] };
            const message = details.map((i) => i.message).join(',');

            res.status(422).json({ error: message });
        }
    };
};

export default validate;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate = (schema, property = '') => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        console.log('Error', error);
        const valid = error == null;
        if (valid) {
            console.log('VALID');
            next();
        }
        else {
            const { details } = error || { details: [] };
            const message = details.map((i) => i.message).join(',');
            res.status(422).json({ error: message });
        }
    };
};
exports.default = validate;

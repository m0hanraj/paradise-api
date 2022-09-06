import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/paradise?retryWrites=true&w=majority`;

const db = () => {
    mongoose
        .connect(dbConfig)
        .then((response) => console.log('Connected to db..'));
};

export default db;

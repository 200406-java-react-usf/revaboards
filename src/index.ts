import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';


import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';
import { AuthRouter } from './routers/auth-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';
import dotenv from 'dotenv' 
import { Pool } from 'pg';

dotenv.config();

//database configuration
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

const app = express();

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.use('/', express.json());
app.use(sessionMiddleware);
app.use(corsFilter);


app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/auth', AuthRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});

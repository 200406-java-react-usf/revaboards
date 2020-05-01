<<<<<<< HEAD
import express, { Response } from 'express';
import bodyparser from 'body-parser';

import { PostRepository } from './repos/post-repo';
import { UserRepository } from './repos/user-repo';
import { User } from './models/user';

const app = express();
const userRepo = UserRepository.getInstance();
const postRepo = PostRepository.getInstance();

app.use('/', bodyparser.json());

app.get('/user', async (req, resp) => {
    
    try{
        let payload = await userRepo.getAll();
        resp.status(200).json(payload).send();
    }catch (e) {
        resp.status(404).json(e).send();
    }
})

=======
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';
import { AuthRouter } from './routers/auth-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';
import { Pool } from 'pg';

// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });

// web server configuration
const app = express();
app.use(morgan('combined', { stream: logStream }));
app.use(sessionMiddleware);
app.use(corsFilter);
app.use('/', express.json());
app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/auth', AuthRouter);

>>>>>>> ad9629a0b4c1705dba926087ecf82f9255ac2613
app.listen(8080, () => {
    console.log('Application running and listening at http://localhost:8080');
    
})

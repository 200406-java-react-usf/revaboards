import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

import { sessionMiddleware } from './middleware/session-middleware';
import { corsFilter } from './middleware/cors-filter';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';
import { AuthRouter } from './routers/auth-router';

dotenv.config();

const app = express();

// logging configuration
fs.exists(`${__dirname}/logs`, () => fs.mkdir(`${__dirname}/logs`, () => {}));
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

// other middleware configuration
app.use('/', express.json());
app.use(sessionMiddleware);
app.use(corsFilter);

// routing configuration
app.use('/users', UserRouter);
app.use('/posts', PostRouter);
app.use('/auth', AuthRouter);

app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});

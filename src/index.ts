import bodyparser from 'body-parser';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';

import { UserRouter } from './routers/user-router';
// import { PostRouter } from './routers/post-router';

const app = express();

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));

app.use('/', bodyparser.json());


app.use('/users', UserRouter);
// app.use('/posts', PostRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});

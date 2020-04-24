import express from 'express';
import bodyparser from 'body-parser';

import { UserRouter } from './routers/user-router';
import { PostRouter } from './routers/post-router';

const app = express();

app.use('/', bodyparser.json());

app.use('/users', UserRouter);
app.use('/posts', PostRouter);


app.listen(8080, () => {
    console.log(`Application running and listening at: http://localhost:8080`);
});

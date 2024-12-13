//import path from 'node:path';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import UserRouter from './users/UserRouter';
import { errorHandler, routerNotFoundHandler } from './common';
import { connect_db } from './db';
//import { checkToken } from './users/users.middleware';


const app = express();
connect_db();

app.use(morgan('dev'));
app.use(cors());
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(json());

app.use('/users', UserRouter);

app.use(routerNotFoundHandler);
app.use(errorHandler);

app.listen(3000, () => console.log(`Listening on 3000`));

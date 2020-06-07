import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

import { errors } from 'celebrate'

require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes)

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))

app.use(errors());

app.listen(process.env.PORT);
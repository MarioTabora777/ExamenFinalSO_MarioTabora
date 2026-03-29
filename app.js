import dotenv from 'dotenv';
dotenv.config({ silent: true });
import express from 'express';

const app = express();
app.use(express.json());

import usersRouter from './routes/users.js';
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

export default app;

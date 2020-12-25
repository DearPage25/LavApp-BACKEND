import express from 'express';
const app = express();
import userRouter from './user-routers';
import personRouter from './person-routers';
app.use(userRouter);
app.use(personRouter);

module.exports = app;
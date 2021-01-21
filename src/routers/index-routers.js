import express from 'express';
const app = express();
import userRouter from './user-routers';
import personRouter from './person-routers';
import departament from './departament-routes'
import services from './services-routers';
app.use(userRouter);
app.use(personRouter);
app.use(departament);
app.use(services);

module.exports = app;
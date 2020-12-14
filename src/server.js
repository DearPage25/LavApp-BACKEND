import express, {json} from 'express';

import morgan from 'morgan';
import usuarioRouter from './routers/usuario-routers';

const app = express();

app.use(morgan('dev'));
app.use(json());

//rutas
app.use('/api/usuario', usuarioRouter);

export default app;
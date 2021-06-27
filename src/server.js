require('../config.env');
import express, {json} from 'express';
import cors from 'cors';
const app = express();

import morgan from 'morgan';
import router from './routers/index-routers';

app.use(morgan('dev'));
app.use(json());

app.use(cors());
//rutas
app.use('/api', router);

export default app;

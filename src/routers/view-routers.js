
import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import {getClotheServicesView} from '../controllers/clotheServicesType';

router.get('/viewclotheservices', verificaToken ,getClotheServicesView);

module.exports = router;
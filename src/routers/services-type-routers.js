import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createServicesType, getAllServicesType, getOneServicesType, updateServicesType } from '../controllers/services-type-controller'
router.post('/servicestype',verificaToken,  createServicesType);
router.get('/servicestype/:id_servicetype',verificaToken, getOneServicesType);
router.get('/servicestype',verificaToken, getAllServicesType);
router.put('/servicestype/:id_servicetype', verificaToken,  updateServicesType);
module.exports = router;
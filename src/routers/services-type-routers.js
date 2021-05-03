import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createServicesType, getAllServicesType, getOneServicesType, updateServicesType } from '../controllers/services-type-controller'
router.post('/servicestype', createServicesType);
router.get('/servicestype/:id_servicetype', getOneServicesType);
router.get('/servicestype', getAllServicesType);
router.put('/servicestype/:id_servicetype', updateServicesType);
module.exports = router;
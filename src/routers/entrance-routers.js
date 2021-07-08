import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createEntrance, getInfo } from '../controllers/entrance-controller'
router.post('/depentrance',verificaToken,  createEntrance);
router.post('/info',verificaToken,  getInfo);
// router.get('/servicestype/:id_servicetype',verificaToken, getOneServicesType);
// router.get('/servicestype',verificaToken, getAllServicesType);
// router.put('/servicestype/:id_servicetype', verificaToken,  updateServicesType);
module.exports = router;
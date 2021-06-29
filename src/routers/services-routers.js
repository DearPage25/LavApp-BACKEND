import { Router } from 'express';
const router = Router();
import {createServices, getAllServices, getOneService, updateService, deleteService} from '../controllers/services-controller'
import { verificaToken } from '../middlewares/authentications';
router.post('/service', verificaToken, createServices);
router.get('/service',verificaToken, getAllServices);
router.get('/service/:id_service', verificaToken, getOneService);
router.put('/service/:id_service', verificaToken, updateService);
router.delete('/service/:id_service',verificaToken, deleteService);

module.exports = router;
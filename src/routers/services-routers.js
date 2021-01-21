import { Router } from 'express';
const router = Router();
import {createServices, getAllServices, getOneService, updateService, deleteService} from '../controllers/services-controller'

router.post('/service', createServices);
router.get('/service', getAllServices);
router.get('/service/:id_service', getOneService);
router.put('/service/:id_service', updateService);
router.delete('/service/:id_service', deleteService);

module.exports = router;
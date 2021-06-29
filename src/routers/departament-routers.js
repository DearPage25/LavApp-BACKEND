import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createDepartment, getAllDepartment, getOneDepartment, updateOneDepartment, DeleteOneDepartment } from '../controllers/departament-controller';
router.post('/department',verificaToken, createDepartment);
router.get('/department',verificaToken, getAllDepartment);
router.get('/department/:id_department',verificaToken, getOneDepartment);
router.delete('/department/:id_department',verificaToken, DeleteOneDepartment);
router.put('/department/:id_department',verificaToken, updateOneDepartment);


module.exports = router;
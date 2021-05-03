import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createDepartment, getAllDepartment, getOneDepartment, updateOneDepartment, DeleteOneDepartment } from '../controllers/departament-controller';
router.post('/department', createDepartment);
router.get('/department', getAllDepartment);
router.get('/department/:id_department', getOneDepartment);
router.delete('/department/:id_department', DeleteOneDepartment);
router.put('/department/:id_department', updateOneDepartment);


module.exports = router;
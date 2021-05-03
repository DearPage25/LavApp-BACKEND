import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createClothe, getAllClothe, getOneClothe, deleteClothe, updateClothe } from '../controllers/clothe-type-controller'
router.post('/clothe', createClothe);
router.get('/clothe', getAllClothe);
router.get('/clothe/:id_clothe_type', getOneClothe);
router.put('/clothe/:id_clothe_type', updateClothe);
router.delete('/clothe/:id_clothe_type', deleteClothe);


module.exports = router;
import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createClothe, getAllClothe, getOneClothe, deleteClothe, updateClothe } from '../controllers/clothe-type-controller'
router.post('/clothe',verificaToken , createClothe);
router.get('/clothe',verificaToken , getAllClothe);
router.get('/clothe/:id_clothe_type',verificaToken , getOneClothe);
router.put('/clothe/:id_clothe_type',verificaToken , updateClothe);
router.delete('/clothe/:id_clothe_type',verificaToken , deleteClothe);


module.exports = router;
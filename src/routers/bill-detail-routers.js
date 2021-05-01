import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createBillDetail, getAllBillDetail, getOneBillDetail, updateBillDetail } from '../controllers/bill-detail-controller'

router.post('/billdetail',verificaToken , createBillDetail);
router.get('/billdetail',verificaToken ,getAllBillDetail);
router.get('/billdetail/:id_billdetail',verificaToken , getOneBillDetail);
router.put('/billdetail/:id_billdetail',verificaToken , updateBillDetail);
module.exports = router;
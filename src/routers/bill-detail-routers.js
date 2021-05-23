import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createBillDetail, getAllBillDetail, getOneBillDetail, updateBillDetail, getBillMain} from '../controllers/bill-detail-controller'

router.post('/billdetail', createBillDetail);
router.get('/billdetail' ,getAllBillDetail);
router.get('/billdetail/bybill/:id_bybill' ,getBillMain);
router.get('/billdetail/:id_billdetail' , getOneBillDetail);
router.put('/billdetail/:id_billdetail' , updateBillDetail);
module.exports = router;
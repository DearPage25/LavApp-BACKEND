import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { getAllBill, getOneBill, createBill, upDateBill, deleteBill } from '../controllers/bill-controller'
router.get('/bill/:id_bill', getOneBill);
router.get('/bill', getAllBill);
router.post('/bill', createBill);
router.put('/bill/:id_bill',upDateBill);
router.delete('/bill/:id_bill',deleteBill);

module.exports = router;
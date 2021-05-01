import Router from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { getAllBill, getOneBill, createBill, upDateBill, deleteBill } from '../controllers/bill-controller'
router.get('/bill/:id_bill',verificaToken, getOneBill);
router.get('/bill',verificaToken, getAllBill);
router.post('/bill',verificaToken, createBill);
router.put('/bill/:id_bill',verificaToken, upDateBill);
router.delete('/bill/:id_bill',verificaToken, deleteBill);

module.exports = router;
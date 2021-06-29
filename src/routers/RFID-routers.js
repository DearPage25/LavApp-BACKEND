import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createRFID, getAllRFID, getOneRFID, updatedRFID, deletedRfid } from '../controllers/RFID-controller';
router.post('/rfid',verificaToken,  createRFID);
router.get('/rfid',verificaToken, getAllRFID);
router.get('/rfid/:id_rfid',verificaToken, getOneRFID);
router.put('/rfid/:id_rfid',verificaToken, updatedRFID);
router.delete('/rfid/:id_rfid',verificaToken, deletedRfid);

module.exports = router;
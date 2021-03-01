import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { createRFID, getAllRFID, getOneRFID, updatedRFID, deletedRfid } from '../controllers/RFID-controller';
router.post('/rfid', createRFID);
router.get('/rfid', getAllRFID);
router.get('/rfid/:id_rfid',getOneRFID);
router.put('/rfid/:id_rfid',updatedRFID);
router.delete('/rfid/:id_rfid',deletedRfid);

module.exports = router;
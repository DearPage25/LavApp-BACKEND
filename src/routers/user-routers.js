import {Router} from 'express';
const router = Router();
import {createUser, getAllUser} from '../controllers/usuario-controller';
router.post('/usuario', createUser);
router.get('/usuario', getAllUser);



module.exports = router;
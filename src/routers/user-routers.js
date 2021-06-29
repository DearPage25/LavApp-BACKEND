import { Router } from 'express';
const router = Router();
import {verificaToken, verificaRole} from '../middlewares/authentications.js';
import { createUser, getOneUser, getAllUser, updateUser } from '../controllers/usuario-controller';
import { Login } from '../controllers/login-controller';
router.post('/usuario', verificaToken, createUser);
router.get('/usuario', verificaToken,getAllUser);
router.get('/usuario/:id_user', verificaToken,getOneUser);
router.put('/usuario/:id_user',verificaToken, updateUser);
router.post('/usuario/login', Login);


module.exports = router;
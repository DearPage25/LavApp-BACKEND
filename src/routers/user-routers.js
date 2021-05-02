import { Router } from 'express';
const router = Router();
import {verificaToken, verificaRole} from '../middlewares/authentications.js';
import { createUser, getOneUser, getAllUser, updateUser } from '../controllers/usuario-controller';
import { Login } from '../controllers/login-controller';
router.post('/usuario',verificaRole, createUser);
router.get('/usuario',verificaRole, getAllUser);
router.get('/usuario/:id_user',[verificaToken, verificaRole], getOneUser);
router.put('/usuario/:id_user',[verificaToken, verificaRole], updateUser);
router.post('/usuario/login', Login);


module.exports = router;
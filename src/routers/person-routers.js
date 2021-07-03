import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { getOnePerson, getAllPerson, createPerson, updatePerson, getOnePersonByTel } from '../controllers/person-controller';
router.get('/person/:id_person',verificaToken, getOnePerson);
router.get('/person/tel/:tel_number',verificaToken, getOnePersonByTel);
router.get('/person',verificaToken, getAllPerson);
router.post('/person', verificaToken,createPerson);
router.put('/person/:id_person',verificaToken, updatePerson);



module.exports = router;
import { Router } from 'express';
const router = Router();
import { verificaToken } from '../middlewares/authentications';
import { getOnePerson, getAllPerson, createPerson, updatePerson } from '../controllers/person-controller';
router.get('/person/:id_person', getOnePerson);
router.get('/person', getAllPerson);
router.post('/person', createPerson);
router.put('/person/:id_person', updatePerson);



module.exports = router;
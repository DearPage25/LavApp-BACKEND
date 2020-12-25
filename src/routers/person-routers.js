import {Router} from 'express';
const router = Router();
import {getOnePerson, getAllPerson, createPerson, updatePerson} from '../controllers/person-controller';
router.get('/usuario/person/:ID_PERSON', getOnePerson);
router.get('/usuario/person', getAllPerson);
router.post('/usuario/person',createPerson );
router.put('/usuario/person/:ID_PERSON', updatePerson);



module.exports = router;
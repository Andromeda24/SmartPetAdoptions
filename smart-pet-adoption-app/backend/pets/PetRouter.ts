import { Router } from 'express';
import { checkToken, checkAdm } from '../users/UserMiddleware';
import multer from 'multer';
import { listPets, newPet,updatePet,deletePet, recommendPet } from './PetController';

const PetRouter = Router();
// Middleware

//const uploadHelper = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, '/my-images');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname);
    }
  });

const uploadHelper = multer({ dest: 'pictures/'});
//const uploadHelper = multer(storage);

PetRouter.get('/', listPets);
PetRouter.get('/:page/:ownerId', listPets);
PetRouter.post('/recommend', recommendPet);
PetRouter.post('/', checkToken,  checkAdm, newPet);
PetRouter.put('/picture/:petid',checkToken, checkAdm, uploadHelper.single('profile_picture') , updatePet);
PetRouter.put('/:id',checkToken, checkAdm, updatePet);
PetRouter.delete('/:petid',deletePet);

export default PetRouter;
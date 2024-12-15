import { Router } from 'express';
import { checkToken } from '../users/UserMiddleware';
import multer from 'multer';
import { listPets, newPet,updatePet,deletePet } from './PetController';

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
PetRouter.post('/', checkToken, newPet);
PetRouter.put('/picture/:id',checkToken, uploadHelper.single('profile_picture') , updatePet);
PetRouter.put('/:id',checkToken, updatePet);
PetRouter.delete('/:id',deletePet);

export default PetRouter;
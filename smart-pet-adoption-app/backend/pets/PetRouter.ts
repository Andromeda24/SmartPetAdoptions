import { Router } from 'express';
import { checkToken, checkAdm } from '../users/UserMiddleware';
import multer from 'multer';
import { listPets, newPet,updatePet,deletePet, recommendPet } from './PetController';

const PetRouter = Router();
// Middleware

//const uploadHelper = multer({ dest: 'pictures/'});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pictures')
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1000)
    cb(null, file.fieldname + '-' + uniqueSuffix  )
  }
})

const uploadHelper = multer({ storage: storage })


PetRouter.get('/', listPets);
PetRouter.get('/:page/:ownerId', listPets);
PetRouter.get('/recommend', recommendPet);
PetRouter.post('/', checkToken,  checkAdm, uploadHelper.single('image_path') ,newPet);
PetRouter.put('/picture/:petid',checkToken, checkAdm, uploadHelper.single('image_path') , updatePet);
PetRouter.put('/:id',checkToken, checkAdm, updatePet);
PetRouter.delete('/:petid',deletePet);

export default PetRouter;
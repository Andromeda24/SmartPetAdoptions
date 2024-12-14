import { Router } from 'express';
import { signin, signup, upload_picture } from './UserController';
import { checkToken } from './UserMiddleware';
import multer from 'multer';

const UserRouter = Router();
//const upload = multer({ dest: 'uploads/' });

UserRouter.post('/signup', signup);
UserRouter.post('/login', signin);
//UserRouter.post('/pictures', checkToken, upload.single('profile_picture'), upload_picture);

export default UserRouter;
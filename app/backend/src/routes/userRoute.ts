import * as express from 'express';
import validateLogin from '../middlewares/validateLogin';
import userController from '../controllers/userController';
import validateJwt from '../middlewares/validateJwt';

const userRouter = express.Router();

userRouter.post('/', validateLogin, userController.login);

userRouter.get('/validate', validateJwt, userController.getRole);

export default userRouter;

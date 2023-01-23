import * as express from 'express';
import validateLogin from '../middlewares/validateLogin';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', validateLogin, userController.login);

export default userRouter;

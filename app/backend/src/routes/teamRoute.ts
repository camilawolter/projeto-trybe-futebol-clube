import * as express from 'express';
import teamController from '../controllers/teamController';

const teamRouter = express.Router();

teamRouter.get('/', teamController.getAllTeams);

export default teamRouter;

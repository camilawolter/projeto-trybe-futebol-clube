import * as express from 'express';
import validateJwt from '../middlewares/validateJwt';
import validateMatch from '../middlewares/validateMatch';
import matchController from '../controllers/matchController';

const matchRouter = express.Router();

matchRouter.get('/', matchController.getAllMatchesInProgress);

matchRouter.get('/', matchController.getAllMatches);

matchRouter.post('/', validateJwt, validateMatch, matchController.createdMatches);

matchRouter.patch('/:id/finish', matchController.finishMatches);

matchRouter.patch('/:id', matchController.updateGoals);

export default matchRouter;

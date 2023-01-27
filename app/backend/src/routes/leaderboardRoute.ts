import * as express from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', leaderboardController.getLeaderboardHome);

leaderboardRouter.get('/away', leaderboardController.getLeaderboardAway);

leaderboardRouter.get('/', leaderboardController.getLeaderboardHomeAway);

export default leaderboardRouter;

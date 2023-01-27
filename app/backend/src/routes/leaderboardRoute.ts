import * as express from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = express.Router();

leaderboardRouter.get('/home', leaderboardController.getLeaderboardHome);

export default leaderboardRouter;

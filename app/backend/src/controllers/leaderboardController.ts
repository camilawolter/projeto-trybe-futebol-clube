import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

const getLeaderboardHome = async (req: Request, res: Response): Promise<Response> => {
  const result = await leaderboardService.getLeaderboardHome();

  return res.status(200).json(result.message);
};

const getLeaderboardAway = async (req: Request, res: Response): Promise<Response> => {
  const result = await leaderboardService.getLeaderboardAway();

  return res.status(200).json(result.message);
};

const getLeaderboardHomeAway = async (req: Request, res: Response): Promise<Response> => {
  const result = await leaderboardService.getLeaderboardHomeAway();

  return res.status(200).json(result.message);
};

export default { getLeaderboardHome, getLeaderboardAway, getLeaderboardHomeAway };

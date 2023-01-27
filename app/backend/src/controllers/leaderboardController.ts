import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

const getLeaderboardHome = async (req: Request, res: Response): Promise<Response> => {
  const [result] = await leaderboardService.getLeaderboardHome();

  return res.status(200).json(result);
};

export default { getLeaderboardHome };

import { NextFunction, Request, Response } from 'express';
import matchService from '../services/matchService';

const getAllMatches = async (req:Request, res:Response) => {
  const matches = await matchService.getAllMatches();
  return res.status(200).json(matches);
};

const getAllMatchesInProgress = async (req:Request, res:Response, next: NextFunction) => {
  const { inProgress } = req.query;
  if (!inProgress) return next();

  const matches = await matchService.getAllMatchesInProgress(inProgress as unknown as string);
  return res.status(200).json(matches);
};

export default { getAllMatches, getAllMatchesInProgress };

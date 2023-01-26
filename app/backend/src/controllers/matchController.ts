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

const createdMatches = async (req:Request, res:Response) => {
  const { user, ...match } = req.body;

  const newMatch = await matchService.createdMatches(match);
  return res.status(201).json(newMatch);
};

const finishMatches = async (req:Request, res:Response) => {
  const { id } = req.params;

  const finishMatch = await matchService.finishMatches(Number(id));

  if (finishMatch) {
    return res.status(200).json({ message: 'Finished' });
  }
  return res.status(500).json({ message: 'Not finished' });
};

const updateGoals = async (req:Request, res:Response) => {
  const { id } = req.params;

  await matchService.updateGoals(Number(id), req.body);
  return res.status(200).json({ message: 'Score is updated' });
};

export default {
  getAllMatches,
  getAllMatchesInProgress,
  createdMatches,
  finishMatches,
  updateGoals };

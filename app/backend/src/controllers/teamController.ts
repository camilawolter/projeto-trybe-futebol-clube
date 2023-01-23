import { Request, Response } from 'express';
import teamService from '../services/teamService';

const getAllTeams = async (req: Request, res: Response) => {
  const teams = await teamService.getAllTeams();
  return res.status(200).json(teams);
};

export default { getAllTeams };

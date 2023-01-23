import { Request, Response } from 'express';
import teamService from '../services/teamService';

const getAllTeams = async (req: Request, res: Response) => {
  const teams = await teamService.getAllTeams();
  return res.status(200).json(teams);
};

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const team = await teamService.getById(Number(id));
  return res.status(200).json(team);
};

export default { getAllTeams, getById };

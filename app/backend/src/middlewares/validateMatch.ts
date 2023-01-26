import { NextFunction, Request, Response } from 'express';
import teamService from '../services/teamService';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { user, ...match } = req.body;

  if (match.homeTeamId === match.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const allTeams = await teamService.getAllTeams();

  const teamsExist = allTeams
    .filter((team) => team.id === match.homeTeamId || team.id === match.awayTeamId);

  if (teamsExist.length !== 2) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatch;

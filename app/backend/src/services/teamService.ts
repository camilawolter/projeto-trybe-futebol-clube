import { ITeam } from '../interfaces';
import TeamModel from '../database/models/TeamModel';

const getAllTeams = async (): Promise<ITeam[]> => {
  const teams = TeamModel.findAll();
  return teams;
};

export default { getAllTeams };

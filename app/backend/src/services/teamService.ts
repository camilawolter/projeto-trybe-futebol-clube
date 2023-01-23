import { ITeam } from '../interfaces';
import TeamModel from '../database/models/TeamModel';

const getAllTeams = async (): Promise<ITeam[]> => {
  const teams = TeamModel.findAll();
  return teams;
};

const getById = async (id: number): Promise<ITeam> => {
  const team = TeamModel.findByPk(id);
  return team as unknown as ITeam;
};

export default { getAllTeams, getById };

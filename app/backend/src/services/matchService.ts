import { IMatch } from '../interfaces';
import MatchModel from '../database/models/MatchModel';
import TeamModel from '../database/models/TeamModel';

const getAllMatches = async (): Promise<IMatch[]> => {
  const allMatches = await MatchModel.findAll({
    include: [{ model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return allMatches as unknown as IMatch[];
};

export default { getAllMatches };

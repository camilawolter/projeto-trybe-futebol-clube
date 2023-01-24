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

const getAllMatchesInProgress = async (inProgress: string): Promise<IMatch[]> => {
  const filter = inProgress === 'true' ? 1 : 0;

  const allMatches = await MatchModel.findAll({
    where: { inProgress: filter },
    include: [{ model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } }],
  });
  return allMatches as unknown as IMatch[];
};

export default { getAllMatches, getAllMatchesInProgress };

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

const createdMatches = async (match: IMatch): Promise<IMatch> => {
  const newMatch = await MatchModel.create({
    ...match, inProgress: true,
  }, { include: [{ model: TeamModel, as: 'homeTeam' },
    { model: TeamModel, as: 'awayTeam' }],
  });
  return newMatch as unknown as IMatch;
};

const finishMatches = async (id:number): Promise<number> => {
  const [updateMatch] = await MatchModel.update(
    { inProgress: false },
    { where: { id } },
  );
  return updateMatch;
};

export default {
  getAllMatches,
  getAllMatchesInProgress,
  createdMatches,
  finishMatches };

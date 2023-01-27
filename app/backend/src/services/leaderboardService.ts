import { QueryTypes } from 'sequelize';
import sequelize from '../database/models';

const startQuery = `Select 
teams.team_name as name,
(SUM(home_goals > away_goals) * 3) +
SUM(home_goals = away_goals) as totalPoints,
COUNT(team) as totalGames,
SUM(home_goals > away_goals) as totalVictories, 
SUM(home_goals = away_goals) AS totalDraws,
SUM(home_goals < away_goals) AS totalLosses,
SUM(home_goals) as goalsFavor,
SUM(away_goals) as goalsOwn,
SUM(home_goals - away_goals) as goalsBalance,
ROUND(((SUM(
  CASE
    WHEN home_goals > away_goals THEN 3
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) / (COUNT(team)*3)) * 100),2) as efficiency
from
(SELECT home_team_id as team, home_team_goals as home_goals, 
      away_team_goals  as away_goals, 'home' as local
FROM TRYBE_FUTEBOL_CLUBE.matches
where in_progress = 0
union all 
SELECT away_team_id as team, away_team_goals as home_goals, 
     home_team_goals as away_goals, 'away' as local
FROM TRYBE_FUTEBOL_CLUBE.matches
where in_progress = 0 ) AS Base 
INNER JOIN teams ON teams.id = team
where local IN (`;
const endQuery = `)
GROUP BY team
ORDER BY totalPoints DESC,
         goalsBalance DESC,
         goalsFavor DESC;`;

const getLeaderboardHome = async () => {
  const result = await sequelize
    .query(`${startQuery}${'"home"'}${endQuery}`, { type: QueryTypes.SELECT });

  return { type: null, message: result };
};

const getLeaderboardAway = async () => {
  const result = await sequelize
    .query(`${startQuery}${'"away"'}${endQuery}`, { type: QueryTypes.SELECT });

  return { type: null, message: result };
};

const getLeaderboardHomeAway = async () => {
  const result = await sequelize
    .query(`${startQuery}${'"home", "away"'}${endQuery}`, { type: QueryTypes.SELECT });

  return { type: null, message: result };
};

export default { getLeaderboardHome, getLeaderboardAway, getLeaderboardHomeAway };

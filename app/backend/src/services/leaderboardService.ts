import { QueryTypes } from 'sequelize';
import { ILeaderboard } from '../interfaces';
import sequelize from '../database/models';

const queryHome = `SELECT team_name as name,
COUNT(matches.home_team_id = teams.id) as totalGames,
(SUM(matches.home_team_goals > matches.away_team_goals) * 3) +
SUM(matches.home_team_goals = matches.away_team_goals) as totalPoints,
SUM(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
SUM(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
SUM(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
SUM(matches.home_team_goals) as goalsFavor,
SUM(matches.away_team_goals) as goalsOwn,
SUM(matches.home_team_goals) - SUM(matches.away_team_goals) as goalsBalance,
ROUND(((SUM(
  CASE
    WHEN matches.home_team_goals > matches.away_team_goals THEN 3
    WHEN matches.home_team_goals = matches.away_team_goals THEN 1
    ELSE 0
  END) / (COUNT(teams.team_name)*3)) * 100),2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as matches
INNER JOIN  TRYBE_FUTEBOL_CLUBE.teams as teams
ON teams.id = matches.home_team_id
WHERE matches.in_progress = false
GROUP BY
  teams.team_name 
ORDER BY
  totalPoints DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn ASC;`;

const queryAway = `SELECT team_name as name,
COUNT(matches.away_team_id = teams.id) as totalGames,
(SUM(matches.away_team_goals > matches.home_team_goals) * 3) +
SUM(matches.away_team_goals = matches.home_team_goals) as totalPoints,
SUM(matches.away_team_goals > matches.home_team_goals) AS totalVictories,
SUM(matches.away_team_goals < matches.home_team_goals) AS totalLosses,
SUM(matches.away_team_goals = matches.home_team_goals) AS totalDraws,
SUM(matches.away_team_goals) as goalsFavor,
SUM(matches.home_team_goals) as goalsOwn,
SUM(matches.away_team_goals) - SUM(matches.home_team_goals) as goalsBalance,
ROUND(((SUM(
  CASE
    WHEN matches.away_team_goals > matches.home_team_goals THEN 3
    WHEN matches.away_team_goals = matches.home_team_goals THEN 1
    ELSE 0
  END) / (COUNT(teams.team_name)*3)) * 100),2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches as matches
INNER JOIN  TRYBE_FUTEBOL_CLUBE.teams as teams
ON teams.id = matches.away_team_id
WHERE matches.in_progress = false
GROUP BY
  teams.team_name
ORDER BY
  totalPoints DESC,
  goalsBalance DESC,
  goalsFavor DESC,
  goalsOwn ASC;`;

const getLeaderboardHome = async (): Promise<ILeaderboard[]> => {
  const result = await sequelize.query(queryHome);

  return result as unknown as ILeaderboard[];
};

const getLeaderboardAway = async (): Promise<ILeaderboard[]> => {
  const result = await sequelize.query(queryAway);

  return result as unknown as ILeaderboard[];
};

const startQuery = `Select 
teams.team_name as name,
COUNT(team) as totalGames,
(SUM(home_goals > away_goals) * 3) +
SUM(home_goals = away_goals) as totalPoints,
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

const getLeaderboardHomeAway = async () => {
  const result = await sequelize
    .query(`${startQuery}${'"home", "away"'}${endQuery}`, { type: QueryTypes.SELECT });

  return { type: null, message: result };
};

export default { getLeaderboardHome, getLeaderboardAway, getLeaderboardHomeAway };

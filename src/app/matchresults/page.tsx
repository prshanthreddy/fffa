"use client";
import React, { useState } from 'react';

interface Team {
  name: string;
  points: number;
  gamesPlayed: number;
}

const SubmitMatchResultsPage: React.FC = () => {
  const teamNames = ["emus", "mockingbirds", "chickens", "mosquitoes", "grasskickers", "hyenas"];

  const [homeTeamScore, setHomeTeamScore] = useState<number>(0);
  const [awayTeamScore, setAwayTeamScore] = useState<number>(0);

  const [standings, setStandings] = useState<Team[]>(teamNames.map(name => ({ name, points: 0, gamesPlayed: 0 })));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const homeTeamPoints = homeTeamScore > awayTeamScore ? 3 : homeTeamScore === awayTeamScore ? 1 : 0;
    const awayTeamPoints = awayTeamScore > homeTeamScore ? 3 : awayTeamScore === homeTeamScore ? 1 : 0;

    const updatedStandings = standings.map(team => {
      if (team.name === 'Home Team') {
        return { ...team, points: team.points + homeTeamPoints, gamesPlayed: team.gamesPlayed + 1 };
      } else if (team.name === 'Away Team') {
        return { ...team, points: team.points + awayTeamPoints, gamesPlayed: team.gamesPlayed + 1 };
      }
      return team;
    });

    setStandings(updatedStandings);
  };

  

  return (
    <div>
      <h1>Submit Match Results</h1>
      <form onSubmit={handleSubmit}>
       
        <label>
          Home Team:
          <select onChange={(e) => setHomeTeamScore(parseInt(e.target.value))}>
            {teamNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        
        <label>
          Home Team Score:
          <input type="number" value={homeTeamScore} onChange={(e) => setHomeTeamScore(parseInt(e.target.value))} />
        </label>
       
        <label>
          Away Team:
          <select onChange={(e) => setAwayTeamScore(parseInt(e.target.value))}>
            {teamNames.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
       
        <label>
          Away Team Score:
          <input type="number" value={awayTeamScore} onChange={(e) => setAwayTeamScore(parseInt(e.target.value))} />
        </label>
       
        <button type="submit">Submit</button>
      </form>

      <h2>Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Points</th>
            <th>Games Played</th>
          </tr>
        </thead>
        <tbody>
          {standings.map(team => (
            <tr key={team.name}>
              <td>{team.name}</td>
              <td>{team.points}</td>
              <td>{team.gamesPlayed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmitMatchResultsPage;

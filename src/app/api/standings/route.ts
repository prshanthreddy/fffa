import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
    SELECT 
    team_name AS Team,
    COALESCE(SUM(CASE WHEN result = 'win' THEN 1 ELSE 0 END), 0) AS W,
    COALESCE(SUM(CASE WHEN result = 'draw' THEN 1 ELSE 0 END), 0) AS D,
    COALESCE(SUM(CASE WHEN result = 'loss' THEN 1 ELSE 0 END), 0) AS L,
    SUM(goals_scored) - SUM(goals_conceded) AS GD,
    COALESCE(SUM(CASE WHEN result = 'win' THEN 3 WHEN result = 'draw' THEN 1 ELSE 0 END), 0) AS Pts,
    COUNT(*) AS MP
FROM (
    SELECT 
        home_team AS team_name,
        CASE 
            WHEN home_score > away_score THEN 'win'
            WHEN home_score = away_score THEN 'draw'
            ELSE 'loss'
        END AS result,
        home_score AS goals_scored,
        away_score AS goals_conceded
    FROM match_schedule
    UNION ALL
    SELECT 
        away_team AS team_name,
        CASE 
            WHEN away_score > home_score THEN 'win'
            WHEN away_score = home_score THEN 'draw'
            ELSE 'loss'
        END AS result,
        away_score AS goals_scored,
        home_score AS goals_conceded
    FROM Match_schedule
) AS matches
GROUP BY team_name
ORDER BY Pts DESC, GD DESC;
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

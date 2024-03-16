import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

  try {
    const { match_id, home_team, away_team, homeScore, awayScore } = await request.json();
    const match = await sql`
      select * from match_schedule WHERE match_id = ${match_id};
    `;
    if (match.rowCount === 0) {
      return NextResponse.json({ success: false, message: 'Invalid match.' });
    }

    let winner;
    let gd;

    if (homeScore < awayScore) {
      winner = away_team;
      gd = awayScore - homeScore;
    } else if (homeScore > awayScore) {
      winner = home_team;
      gd = homeScore - awayScore;
    } else {
      winner = 'Draw';
      gd = homeScore - awayScore;
    }

    await sql`
      update match_schedule
      set winner = ${winner},
          gd = ${gd},
          home_score = ${homeScore},
          away_score = ${awayScore}
      where match_id = ${match_id};
    `;

    return NextResponse.json({ success: true, message: 'Match result updated successfully.' });
  } catch (error) {
    console.error('Error updating match result:', error);
    return NextResponse.json({ success: false, message: 'An error occurred while updating match result.' });
  }
}

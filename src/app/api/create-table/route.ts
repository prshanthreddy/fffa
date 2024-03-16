import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // All tables in the database
    // const result = await sql`
    // SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
    //   ;
    // `;
    // Add year=2024 into the match_schedule table for all matches
    const result = await sql`
     SELECT * FROM match_schedule;
   `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

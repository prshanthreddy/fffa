"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface StandingRow {
  team: string;
  w: number;
  d: number;
  l: number;
  gd: number;
  pts: number;
  mp: number;
  goals_scored: number;
  goals_conceded: number;
  date: string;
}

export default function Page() {
  const [rows, setRows] = useState<StandingRow[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch(`/api/standings`);
        const data = await response.json();
        if (Array.isArray(data.result.rows)) {
          setRows(data.result.rows);
        } else {
          console.error(
            "Data structure returned from API is not as expected:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    const fetchYears = async () => {
      try {
        const response = await fetch("/api/match_years");
        const year = await response.json();
        console.log(year.result.rows);
        if (Array.isArray(year.result.rows)) {
          const extractedYears = year.result.rows.map((item: any) => item.year);
          setYears(extractedYears);
        } else {
          console.error(
            "Data structure returned from API is not as expected:",
            year
          );
        }
      } catch (error) {
        console.error("Error fetching years from the API:", error);
      }
    };
    fetchStandings();
    fetchYears();
  }, [selectedYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  return (
    <div>
      <br />
      <center>
        <h1>Flagrant Fowl Futbol Association</h1>
        <h2>2024 Final Standings</h2>
      </center>
      <br />
      <div>
        <label htmlFor="year">Select Year:</label>
        <select id="year" onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th></th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>Pts</th>
            <th>MP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.team.toUpperCase()}</td>
              <td>
                <Image
                  src={`/logos/${row.team.toLowerCase()}.jpeg`}
                  alt={`Logo of ${row.team}`}
                  width={50}
                  height={50}
                />
              </td>
              <td>{row.w}</td>
              <td>{row.d}</td>
              <td>{row.l}</td>
              <td>{row.gd}</td>
              <td>{row.pts}</td>
              <td>{row.mp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

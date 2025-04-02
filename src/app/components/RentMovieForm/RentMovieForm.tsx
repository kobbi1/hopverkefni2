"use client";

import { useState } from "react";
import { MovieRentalApi } from "@/api";
import { RentalInput, Rental } from "@/types";

const api = new MovieRentalApi();

export default function RentMovieForm({ presetMovieId }: { presetMovieId?: number }) {
  const [userId, setUserId] = useState<number>(1); 
  const [movieId, setMovieId] = useState<number>(presetMovieId ?? 1);
  const [rental, setRental] = useState<Rental | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const rentalData: RentalInput = { userId, movieId };
    const result = await api.rentMovie(rentalData);

    if (result) {
      setRental(result);
    } else {
      setError("Failed to rent movie. Maybe no copies available?");
    }
  };

  return (
    <div>
      <h2>🎬 Rent This Movie</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 300 }}>
        <label>
          User ID:
          <input type="number" value={userId} onChange={(e) => setUserId(Number(e.target.value))} />
        </label>
        {!presetMovieId && (
          <label>
            Movie ID:
            <input type="number" value={movieId} onChange={(e) => setMovieId(Number(e.target.value))} />
          </label>
        )}
        <button type="submit">Rent</button>
      </form>

      {rental && (
        <div style={{ marginTop: "1rem" }}>
           Rental Created: Rental ID {rental.id}
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
           {error}
        </div>
      )}
    </div>
  );
}

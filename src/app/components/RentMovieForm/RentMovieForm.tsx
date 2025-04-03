"use client";

import { useEffect, useState } from "react";
import { MovieRentalApi } from "@/api";
import { RentalInput, Rental, TokenPayload } from "@/types";
import { jwtDecode } from "jwt-decode";

export default function RentMovieForm({ presetMovieId }: { presetMovieId?: number }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [movieId, setMovieId] = useState<number>(presetMovieId ?? 1);
  const [rental, setRental] = useState<Rental | null>(null);
  const [error, setError] = useState<string>("");

  // ✅ Check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      return;
    }
    const decoded = jwtDecode<TokenPayload>(token);
    if (!decoded.id) throw new Error("Missing user id");
    

    if (token && decoded) {
      setUserId(Number(decoded.id));
    } else {
      setUserId(null); // Not logged in
    }
  }, []);

  if (userId === null) {
    // 👇 If user is not logged in, show nothing (or return null)
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const rentalData: RentalInput = { userId, movieId };
    const api = new MovieRentalApi();
    const result = await api.rentMovie(rentalData);

    if (result) {
      setRental(result);
    } else {
      setError("Failed to rent movie. Maybe no copies available?");
    }
  };

  return (
    <div>
      <h2>🎬 <strong>Rent This Movie</strong></h2>
      <form onSubmit={handleSubmit}>
        {!presetMovieId && (
          <label>
            Movie ID:
            <input type="number" value={movieId} onChange={(e) => setMovieId(Number(e.target.value))} />
          </label>
        )}
        <button type="submit">Rent</button>
      </form>

      {rental && (
        <p style={{ color: "#81c784" }}>
          ✅ Rental Created: Rental ID {rental.id}
        </p>
      )}

      {error && (
        <p style={{ color: "#e57373" }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

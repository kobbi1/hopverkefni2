"use client";

import { useEffect, useState } from "react";
import { MovieRentalApi } from "@/api";
import { RentalInput, Rental, TokenPayload } from "@/types";
import { jwtDecode } from "jwt-decode";
import styles from "../ReturnButton/ReturnButton.module.css"

export default function RentMovieForm({ presetMovieId }: { presetMovieId?: number }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [movieId, setMovieId] = useState<number>(presetMovieId ?? 1);
  const [rental, setRental] = useState<Rental | null>(null);
  const [error, setError] = useState<string>("");

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
      setUserId(null);
    }
  }, []);

  if (userId === null) {
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
        <button className={styles.rentbutton} type="submit">Rent</button>
      </form>

      {rental && (
        <p>
          ✅ Movie has been rented, you should be able to see it in My rentals.
        </p>
      )}

      {error && (
        <p>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

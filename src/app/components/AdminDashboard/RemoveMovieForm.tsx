"use client";

import { useEffect, useState } from "react";
import { MovieRentalApi } from "@/api";
import { Movie } from "@/types";
import styles from "./AddMovieForm.module.css";

export default function RemoveMovieForm() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const api = new MovieRentalApi();

  useEffect(() => {
    async function fetchMovies() {
      const result = await api.getAllMovies();
      if (result) setMovies(result);
    }

    fetchMovies();
  }, []);

  async function handleDelete() {
    if (!selectedId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmed = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmed) return;

    const success = await api.deleteMovie(selectedId, token);

    if (success) {
      setMessage("Movie deleted successfully.");
      setMovies((prev) => prev.filter((m) => m.id !== selectedId));
      setSelectedId(null);
    } else {
      setMessage("Failed to delete movie.");
    }
  }

  return (
    <div>
      <label>Select a movie to delete:</label>
      <select
        value={selectedId ?? ""}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        <option value="" disabled>Select a movie</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.id}>
            {movie.title}
          </option>
        ))}
      </select>

      <br /><br />
      <button onClick={handleDelete} className={styles.button}>
        Delete Movie
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

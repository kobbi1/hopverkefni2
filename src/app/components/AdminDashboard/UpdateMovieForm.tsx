"use client";

import { useEffect, useMemo, useState } from "react";
import { MovieRentalApi } from "@/api";
import styles from "./AddMovieForm.module.css";
import { Movie } from "@/types";

export default function UpdateMovieForm() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseYear: "",
    rentalPrice: "",
    availableCopies: "",
    posterFile: null as File | null,
  });
  const [message, setMessage] = useState("");

  const api = useMemo(() => new MovieRentalApi(), []);

  useEffect(() => {
    async function loadMovies() {
      const result = await api.getAllMovies();
      if (result) setMovies(result);
    }
    loadMovies();
  }, [api]);

  useEffect(() => {
    async function loadMovieDetails() {
      if (!selectedId) return;
      const movie = await api.getMovieById(selectedId);
      if (movie) {
        setFormData({
          title: movie.title,
          description: movie.description,
          releaseYear: movie.releaseYear.toString(),
          rentalPrice: movie.rentalPrice.toString(),
          availableCopies: movie.availableCopies.toString(),
          posterFile: null,
        });
      }
    }
    loadMovieDetails();
  }, [selectedId, api]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const success = await api.updateMovie(
      selectedId,
      {
        title: formData.title,
        description: formData.description,
        releaseYear: Number(formData.releaseYear),
        rentalPrice: Number(formData.rentalPrice),
        availableCopies: Number(formData.availableCopies),
        posterFile: formData.posterFile ?? undefined,
      },
      token
    );

    setMessage(success ? "Movie updated successfully!" : "Update failed.");
  }

  return (
    <div>
      <label>Select movie to update:</label>
      <select
        value={selectedId ?? ""}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        <option value="" disabled>Select a movie</option>
        {movies.map((movie: Movie) => (
          <option key={movie.id} value={movie.id}>{movie.title}</option>
        ))}
      </select>

      {selectedId && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
          <input name="releaseYear" type="number" placeholder="Release Year" value={formData.releaseYear} onChange={handleChange}/>
          <input name="rentalPrice" type="number" placeholder="Rental Price" value={formData.rentalPrice} onChange={handleChange} />
          <input name="availableCopies" type="number" placeholder="Available Copies" value={formData.availableCopies} onChange={handleChange}/>
          <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, posterFile: e.target.files?.[0] || null })} />
          <button type="submit">Update Movie</button>
          {message && <p>{message}</p>}
        </form>
      )}
    </div>
  );
}

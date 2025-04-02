"use client";

import { useState } from "react";
import { MovieRentalApi } from "@/api";
import styles from "./AddMovieForm.module.css";

export default function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseYear, setReleaseYear] = useState<number | "">("");
  const [rentalPrice, setRentalPrice] = useState<number | "">("");
  const [availableCopies, setAvailableCopies] = useState<number | "">("");
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const api = new MovieRentalApi();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to add a movie.");
      return;
    }

    const success = await api.createMovie(
      {
        title,
        description,
        releaseYear: Number(releaseYear),
        rentalPrice: Number(rentalPrice),
        availableCopies: Number(availableCopies),
        posterFile: posterFile ?? undefined,
      },
      token
    );

    if (success) {
      setMessage("Movie added successfully!");
      setTitle("");
      setDescription("");
      setReleaseYear("");
      setRentalPrice("");
      setAvailableCopies("");
      setPosterFile(null);
    } else {
      setMessage("Failed to add movie.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea className={styles.textarea} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input className={styles.input} type="number" placeholder="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(Number(e.target.value))} required />
      <input className={styles.input} type="number" placeholder="Rental Price" value={rentalPrice} onChange={(e) => setRentalPrice(Number(e.target.value))} required />
      <input className={styles.input} type="number" placeholder="Available Copies" value={availableCopies} onChange={(e) => setAvailableCopies(Number(e.target.value))} required />
      <input className={styles.input} type="file" accept="image/*" onChange={(e) => setPosterFile(e.target.files?.[0] || null)} />
      <button className={styles.addMovieButton} type="submit">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

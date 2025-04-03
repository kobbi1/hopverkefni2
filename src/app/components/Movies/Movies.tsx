"use client";

import { useEffect, useState } from "react";
import { MovieRentalApi } from "@/api";
import { PaginatedMovies } from "@/types";
import styles from "./Movies.module.css";
import Image from "next/image";
import Link from "next/link";

interface MoviesProps {
  page: number;
}

export default function Movies({ page }: MoviesProps) {
  const [moviesData, setMoviesData] = useState<PaginatedMovies | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      const api = new MovieRentalApi();
      const result = await api.getMovies(page);
      setMoviesData(result);
      setLoading(false);
    }

    fetchMovies();
  }, [page]);

  if (loading) return (
    <div className={styles.mainContent}>
        <h2>Loading movies...</h2>
    </div>
    
    );
  if (!moviesData) return <p>Failed to load movies.</p>;

  const { data: movies, meta } = moviesData;

  return (
    <div className={styles.mainContent}>
      <h1>Available Movies - Page {meta.page}</h1>

      <div className={styles.nextPrevious}>
        {meta.page > 1 && (
          <Link href={`/movies?page=${meta.page - 1}`}>← Previous</Link>
        )}
        {meta.page < meta.totalPages && (
          <Link href={`/movies?page=${meta.page + 1}`}>Next →</Link>
        )}
      </div>

      <ul className={styles.movies}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movie}>
            <Image
              src={movie.posterUrl || "/placeholder.jpg"}
              alt={movie.title}
              width={150}
              height={225}
            />
            <div className={styles.movieInfo}>
              <Link href={`/movies/${movie.id}`}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
              </Link>
              <p>Price: {movie.rentalPrice} ISK</p>
              <p>Available Copies: {movie.availableCopies}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.nextPrevious}>
        {meta.page > 1 && (
          <Link href={`/movies?page=${meta.page - 1}`}>← Previous</Link>
        )}
        {meta.page < meta.totalPages && (
          <Link href={`/movies?page=${meta.page + 1}`}>Next →</Link>
        )}
      </div>
    </div>
  );
}

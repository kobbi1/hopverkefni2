'use client';

import { Movie } from "@/types";
import Image from "next/image";
import RentMovieForm from "@/app/components/RentMovieForm/RentMovieForm";
import styles from "./MovieDetails.module.css"

type MovieDetailsProps = {
  movie: Movie;
};

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className={styles.background}>
      <main className={styles.page}>
        <div className={styles.titleAndPicture}>
          <Image
            src={movie.posterUrl || "/placeholder.jpg"}
            alt={movie.title}
            width={200}
            height={300}
          />
        </div>
        <div className={styles.movieInfo}>
          <h1>{movie.title}</h1>
          <p><strong>Release Year:</strong> {movie.releaseYear}</p>
          <p><strong>Price:</strong> {movie.rentalPrice} ISK</p>
          <p><strong>Available Copies:</strong> {movie.availableCopies}</p>
          <p><strong>Description:</strong> {movie.description}</p>
        </div>
      </main>
      <div className={styles.rentArea}>
      <hr style={{ margin: "2rem 0" }} />
      <RentMovieForm presetMovieId={movie.id} />
      </div>

    </div>
  );
}

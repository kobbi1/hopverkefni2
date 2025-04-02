'use client';

import { Movie } from "@/types";
import Image from "next/image";
import RentMovieForm from "@/app/components/RentMovieForm/RentMovieForm";
import Footer from "@/app/components/Footer/Footer";
import Navigation from "@/app/components/Navigation/Navigation";

type MovieDetailsProps = {
  movie: Movie;
};

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div>
      <Navigation />
      <main style={{ padding: "2rem" }}>
        <h1>{movie.title}</h1>
        <Image
          src={movie.posterUrl || "/placeholder.jpg"}
          alt={movie.title}
          width={200}
          height={300}
        />
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Price:</strong> {movie.rentalPrice} ISK</p>
        <p><strong>Available Copies:</strong> {movie.availableCopies}</p>
        <hr style={{ margin: "2rem 0" }} />
        <RentMovieForm presetMovieId={movie.id} />
      </main>
      <Footer />
    </div>
  );
}

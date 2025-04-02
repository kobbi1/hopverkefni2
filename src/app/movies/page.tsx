import { MovieRentalApi } from "@/api";
import styles from "./page.module.css";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Image from "next/image";
import Link from "next/link";

interface MoviesPageProps {
  searchParams: { page?: string };
}

export default async function MoviesPage({ searchParams }: MoviesPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const api = new MovieRentalApi();
  const result = await api.getMovies(page);

  if (!result) {
    return <p>Failed to load movies.</p>;
  }

  const { data: movies, meta } = result;

  return (
    <div className={styles.page}>
      <Navigation />
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
                <h4>Release year: {movie.releaseYear}</h4>
                <br />
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

        <br />
        <br />
      </div>
      <Footer />
    </div>
  );
}

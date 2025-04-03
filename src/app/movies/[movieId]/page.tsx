import { MovieRentalApi } from "@/api";
import MovieDetails from "@/app/components/MovieDetails/MovieDetails";

export default async function MovieDetailPage({ params }: { params: { movieId: string } }) {
  const movieId = parseInt(params.movieId);
  const api = new MovieRentalApi();
  const movie = await api.getMovieById(movieId);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return <MovieDetails movie={movie} />;

}

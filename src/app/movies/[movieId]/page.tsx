import { MovieRentalApi } from "@/api";
import MovieDetails from "@/app/components/MovieDetails/MovieDetails";
import RentMovieForm from "@/app/components/RentMovieForm/RentMovieForm";

export default async function MovieDetailPage({ params }: { params: { movieId: string } }) {
  const movieId = parseInt(params.movieId);
  const api = new MovieRentalApi();
  const movie = await api.getMovieById(movieId);

  if (!movie) {
    return <p style={{ padding: "2rem" }}>Movie not found</p>;
  }

  return (<div>
  <MovieDetails movie={movie} />
  <RentMovieForm /></div>

  );

}

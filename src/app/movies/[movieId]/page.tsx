import { MovieRentalApi } from "@/api";
import Footer from "@/app/components/Footer/Footer";
import MovieDetails from "@/app/components/MovieDetails/MovieDetails";
import Navigation from "@/app/components/Navigation/Navigation";

export default async function MovieDetailPage({ params }: { params: { movieId: string } }) {
  const movieId = parseInt(params.movieId);
  const api = new MovieRentalApi();
  const movie = await api.getMovieById(movieId);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <div>
      <Navigation />
      <MovieDetails movie={movie} />
      <Footer />
    </div>

);

}

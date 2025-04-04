import { MovieRentalApi } from "@/api";
import Footer from "@/app/components/Footer/Footer";
import MovieDetails from "@/app/components/MovieDetails/MovieDetails";
import Navigation from "@/app/components/Navigation/Navigation";

// Mark `params` as Promise
type MovieDetailPageProps = {
  params: Promise<{ movieId: string }>;
};

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { movieId } = await params;
  const api = new MovieRentalApi();
  const movie = await api.getMovieById(parseInt(movieId));

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

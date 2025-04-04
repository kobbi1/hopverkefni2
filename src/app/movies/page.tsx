import Movies from "../components/Movies/Movies"; // adjust path as needed
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

export default async function MoviesPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");

  return (
    <div>
      <Navigation />
      <Movies page={page} />
      <Footer />
    </div>
  );
}

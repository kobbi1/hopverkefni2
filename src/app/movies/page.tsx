import styles from "./page.module.css";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Movies from "../components/Movies/Movies";
import { MoviesPageProps } from "@/types";



export default async function MoviesPage({ searchParams }: MoviesPageProps) {
    const page = parseInt(searchParams.page || "1");
  return (
    <div className={styles.page}>
      <Navigation />
        <Movies page={page}/>
      <Footer />
    </div>
  );
}

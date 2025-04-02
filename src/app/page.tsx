import styles from "./page.module.css";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

export default function Home() {
  
  return (
    <div  className={styles.page}>
      <Navigation />
      <h1 className={styles.mainContent}>Hópverkefni 2</h1>
      <Footer/>
      <h2></h2>
    </div>
  );
}

import Link from "next/link";
import styles from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/movies">Movies</Link></li>
      <li><Link href="/login">Login</Link></li>
      <li></li>
    </ul>
    </nav>
  );
}


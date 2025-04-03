"use client"

import Link from "next/link";
import styles from "./Navigation.module.css";
import { MovieRentalApi } from "@/api";
import {useEffect, useState} from "react";
import { usePathname, useRouter} from "next/navigation";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  },[pathname])

  async function handleLogout() {
    
    const api = new MovieRentalApi();
    const success = await api.signout();

    if (success) {
      setIsLoggedIn(false);
      router.push('/login');
    }
  }
  return (
    <nav className={styles.nav}>
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/movies">Movies</Link></li>
      {!isLoggedIn && (
        <div>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/signup">Sign up</Link></li>
        </div>
      )}
      {isLoggedIn && (
        <li><Link onClick={handleLogout} href="/">Logout</Link></li>
      )}
    </ul>
    </nav>
  );
}


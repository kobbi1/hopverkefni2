"use client"

import Link from "next/link";
import styles from "./Navigation.module.css";
import { MovieRentalApi } from "@/api";
import {useEffect, useState} from "react";
import { usePathname, useRouter} from "next/navigation";

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setIsAdmin(role === "ADMIN");
  },[pathname])

  async function handleLogout() {
    
    const api = new MovieRentalApi();
    const success = await api.signout();

    if (success) {
      setIsLoggedIn(false);
      setIsAdmin(false);
      router.push('/login');
    }
  }
  return (
    <nav className={styles.nav}>
    <ul>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/movies">Movies</Link></li>
      {isLoggedIn && isAdmin && (
        <li><Link href="/admin">Admin Panel</Link></li>
      )}
      {!isLoggedIn && (
        <div>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/signup">Sign up</Link></li>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Link href="/my-rentals">My rentals</Link>
          <li><Link onClick={handleLogout} href="/">Logout</Link></li>
        </div>
      
      )}
    </ul>
    </nav>
  );
}


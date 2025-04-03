"use client";

import { useEffect, useState } from "react";
import styles from "./MyRentals.module.css";
import { useRouter } from "next/navigation";
import { MovieRentalApi } from "@/api";
import { Rental } from "@/types";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import ReturnButton from "../ReturnButton";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: number;
  role: string;
  email?: string;
}

export default function MyRentalsPageContent() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<null | boolean>(null);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      if (!decoded.id) throw new Error("Missing user id");
      setIsAuthorized(true);
    } catch (err) {
      console.error("Invalid token:", err);
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (!isAuthorized) return;

    async function fetchRentals() {
      const api = new MovieRentalApi();
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const userId = decoded.id;
        const data = await api.getUserRentals(userId);

        if (data) setRentals(data);
      } catch (err) {
        console.error("Failed to fetch rentals:", err);
      }

      setLoading(false);
    }

    fetchRentals();
  }, [isAuthorized]);

  if (isAuthorized === null || loading) {
    return (
      <div className={styles.page}>
        <div className={styles.mainContent}>
          <h1>Loading your rentals...</h1>
          <p>Please wait while we fetch your movies.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.mainContent}>
        <h1>My Rentals</h1>

        {rentals.length === 0 ? (
          <p>You have no rentals yet.</p>
        ) : (
          <ul className={styles.rentalList}>
            {rentals.map((rental) => (
              <li key={rental.id} className={styles.rentalItem}>
                <h2>{rental.movie?.title}</h2>
                <p>Rented on: {new Date(rental.rentalDate).toLocaleDateString()}</p>
                {rental.returnDate && (
                  <p>Returned on: {new Date(rental.returnDate).toLocaleDateString()}</p>
                )}
                <p>
                  Status: <strong>{rental.status}</strong>
                </p>
                {rental.status === "RENTED" && (
                  <ReturnButton rentalId={rental.id} />
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}

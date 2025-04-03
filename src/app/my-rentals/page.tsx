import { cookies } from "next/headers";
import { redirect } from "next/navigation"; // ⬅️ Needed for redirecting
import { decodeJwt } from "jose";
import { MovieRentalApi } from "@/api";
import Navigation from "@/app/components/Navigation/Navigation";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";
import ReturnButton from "../components/ReturnButton";

interface DecodedToken {
  id: number;
  role: string;
  email?: string;
}

export default async function MyRentalsPage() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    redirect("/login"); // ⬅️ Not logged in? Go to login page
  }

  let userId: number;
  try {
    const decoded = decodeJwt(token) as DecodedToken;

    if (!decoded.id) {
      throw new Error("Token missing user id");
    }

    userId = decoded.id;
  } catch (err) {
    console.error("JWT decode error:", err);
    redirect("/login"); // ⬅️ Bad token? Also go to login page
  }

  const api = new MovieRentalApi();
  const rentals = await api.getUserRentals(userId);

  return (
    <div>
      <Navigation />
      <main style={{ padding: "2rem" }}>
        <h1>My Rentals</h1>

        {rentals && rentals.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {rentals.map((rental) => (
              <li
                key={rental.id}
                style={{
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  background: "#f4f4f4",
                  borderRadius: "0.5rem",
                }}
              >
                <Link href={`/movies/${rental.movie?.id}`}>
                  <h2>{rental.movie?.title}</h2>
                </Link>
                <p>Rented on: {new Date(rental.rentalDate).toLocaleDateString()}</p>
                {rental.returnDate && (
                  <p>Returned on: {new Date(rental.returnDate).toLocaleDateString()}</p>
                )}
                <p>Status: <strong>{rental.status}</strong></p>
                {rental.status === "RENTED" && (
                  <ReturnButton rentalId={rental.id} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no rentals yet.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}

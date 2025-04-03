import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { MovieRentalApi } from "@/api";
import Navigation from "@/app/components/Navigation/Navigation";
import Footer from "@/app/components/Footer/Footer";
import Link from "next/link";

interface DecodedToken {
  id: number; // ✅ Matches your backend token payload
  role: string;
  email?: string;
}

export default async function MyRentalsPage() {
  const token = (await cookies()).get("token")?.value;

  if (!token) {
    return (
      <div>
        <Navigation />
        <main style={{ padding: "2rem" }}>
          <h1>My Rentals</h1>
          <p>Please log in to view your rentals.</p>
        </main>
        <Footer />
      </div>
    );
  }

  let userId: number;
  try {
    const decoded = decodeJwt(token) as DecodedToken;

    if (!decoded.id) {
      throw new Error("Token missing user id");
    }

    userId = decoded.id;
    console.log("🧠 Decoded token:", decoded);
  } catch (err) {
    console.error("JWT decode error:", err);
    return (
      <div>
        <Navigation />
        <main style={{ padding: "2rem" }}>
          <h1>My Rentals</h1>
          <p>Invalid session. Please log in again.</p>
        </main>
        <Footer />
      </div>
    );
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
                <p>
                  Status: <strong>{rental.status}</strong>
                </p>
                <p>
                  Rented on:{" "}
                  {new Date(rental.rentalDate).toLocaleDateString()}
                </p>
                {rental.returnDate && (
                  <p>
                    Returned on:{" "}
                    {new Date(rental.returnDate).toLocaleDateString()}
                  </p>
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

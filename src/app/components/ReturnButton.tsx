"use client";

import { useState } from "react";
import { MovieRentalApi } from "@/api";

export default function ReturnButton({ rentalId }: { rentalId: number }) {
  const [status, setStatus] = useState<"idle" | "returning" | "done">("idle");

  const handleReturn = async () => {
    setStatus("returning");
    const api = new MovieRentalApi();
    const result = await api.returnRental(rentalId);

    if (result) {
      setStatus("done");
      window.location.reload(); // Refresh the page to reflect change
    } else {
      alert("Failed to return the rental.");
      setStatus("idle");
    }
  };

  return (
    <button onClick={handleReturn} disabled={status !== "idle"}>
      {status === "idle" && "Return"}
      {status === "returning" && "Returning..."}
      {status === "done" && "Returned"}
    </button>
  );
}

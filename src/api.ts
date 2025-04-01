import { Movie,PaginatedMovies,Rental,MovieInput,RentalInput,AuthResponse,RegisterResponse } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5050";

export class MovieRentalApi {
    private async fetchFromApi<T>(url: string, options?: RequestInit): Promise<T | null> {
        try {
            const response = await fetch(url, options);
        if (!response.ok) {
            const text = await response.text();
            console.error("API error:", url, response.status, text);
            return null;
        }
        const json = await response.json();
        return json as T;
        } catch (err) {
            console.error("Fetch error:", url, err);
        return null;
        }
    }
  
    async register(email: string, password: string): Promise<RegisterResponse | null> {
        return await this.fetchFromApi<RegisterResponse>(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    }
  
    async login(email: string, password: string): Promise<AuthResponse | null> {
        return await this.fetchFromApi<AuthResponse>(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    }
  
    async getMovies(page: number = 1): Promise<PaginatedMovies | null> {
        return await this.fetchFromApi<PaginatedMovies>(`${BASE_URL}/movies?page=${page}`);
      }
  
    async getMovieById(id: number): Promise<Movie | null> {
        return await this.fetchFromApi<Movie>(`${BASE_URL}/movies/${id}`);
    }
  
    async createMovie(data: MovieInput, token: string): Promise<Movie | null> {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("releaseYear", String(data.releaseYear));
        formData.append("rentalPrice", String(data.rentalPrice));
        formData.append("availableCopies", String(data.availableCopies));
        if (data.posterFile) {
            formData.append("poster", data.posterFile);
        }
    
        return await this.fetchFromApi<Movie>(`${BASE_URL}/movies`, {
            method: "POST",
            headers: {
            Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    }
  
    async updateMovie(id: number, data: MovieInput, token: string): Promise<Movie | null> {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("releaseYear", String(data.releaseYear));
        formData.append("rentalPrice", String(data.rentalPrice));
        formData.append("availableCopies", String(data.availableCopies));
        if (data.posterFile) {
            formData.append("poster", data.posterFile);
        }
    
        return await this.fetchFromApi<Movie>(`${BASE_URL}/movies/${id}`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
    }
  
    async deleteMovie(id: number, token: string): Promise<boolean> {
        const res = await fetch(`${BASE_URL}/movies/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.ok;
    }
  
    async rentMovie(data: RentalInput): Promise<Rental | null> {
        return await this.fetchFromApi<Rental>(`${BASE_URL}/rentals`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    }
  
    async getRentals(): Promise<Rental[] | null> {
        return await this.fetchFromApi<Rental[]>(`${BASE_URL}/rentals`);
    }
  
    async getUserRentals(userId: number): Promise<Rental[] | null> {
        return await this.fetchFromApi<Rental[]>(`${BASE_URL}/rentals/user/${userId}`);
    }
  
    async returnRental(rentalId: number): Promise<Rental | null> {
        return await this.fetchFromApi<Rental>(`${BASE_URL}/rentals/${rentalId}/return`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });
    }
  
    async deleteRental(rentalId: number): Promise<boolean> {
        const res = await fetch(`${BASE_URL}/rentals/${rentalId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return res.ok;
        }
  }
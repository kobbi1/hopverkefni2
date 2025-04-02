export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export interface User {
  id: number;
  email: string;
  role: "USER" | "ADMIN";
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  posterUrl: string | null;
  rentalPrice: number;
  availableCopies: number;
}

export interface PaginatedMovies {
  data: Movie[];
  meta: {
    page: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
  };
}

export interface Rental {
  id: number;
  userId: number;
  movieId: number;
  status: "RENTED" | "RETURNED";
  rentalDate: string;
  returnDate?: string | null;
  user?: User;
  movie?: Movie;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterResponse {
  message: string;
  userId: number;
}

export interface MovieInput {
  title: string;
  description: string;
  releaseYear: number;
  rentalPrice: number;
  availableCopies: number;
  posterFile?: File;
}

export interface RentalInput {
  userId: number;
  movieId: number;
}

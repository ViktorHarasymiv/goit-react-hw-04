import axios from "axios";

import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
  total_pages: number;
}

axios.defaults.baseURL = "https://api.themoviedb.org/";

const TOKEN: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTFmNjllZTRjZWNmOTFjMWNkOGY3ODAzNzZiZjU1NCIsIm5iZiI6MTc0MTkwODEyMS4wNjksInN1YiI6IjY3ZDM2ODk5ZmFjMTYzMGMyNjAyNmVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t2fmtDgkZ89rHqB8C9WF7BzzKCAVoizYCSm4sAxq8zo";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse | null> => {
  const url = `${axios.defaults.baseURL}3/search/movie?query=${query}&page=${page}&include_adult=false&language=en-US`;
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  try {
    const response = await axios.get<MoviesHttpResponse>(url, params);

    return response.data || null;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};

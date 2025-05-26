import axios from "axios";
import type { Movie } from "../types/movie";

axios.defaults.baseURL = "https://api.themoviedb.org/";

const TOKEN: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTFmNjllZTRjZWNmOTFjMWNkOGY3ODAzNzZiZjU1NCIsIm5iZiI6MTc0MTkwODEyMS4wNjksInN1YiI6IjY3ZDM2ODk5ZmFjMTYzMGMyNjAyNmVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t2fmtDgkZ89rHqB8C9WF7BzzKCAVoizYCSm4sAxq8zo";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const url = `${axios.defaults.baseURL}3/search/movie?query=${query}&include_adult=false&language=en-US`;
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  try {
    const response = await axios.get<{ results: Movie[] }>(url, params);

    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

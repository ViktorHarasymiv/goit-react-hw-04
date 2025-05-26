import axios from "axios";
import type { Movie } from "./types/movie";

interface MoviesHttpResponse {
  hits: Movie[];
}

axios.defaults.baseURL = "https://api.themoviedb.org/";

const TOKEN: string =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZTFmNjllZTRjZWNmOTFjMWNkOGY3ODAzNzZiZjU1NCIsIm5iZiI6MTc0MTkwODEyMS4wNjksInN1YiI6IjY3ZDM2ODk5ZmFjMTYzMGMyNjAyNmVkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t2fmtDgkZ89rHqB8C9WF7BzzKCAVoizYCSm4sAxq8zo";

// const myKey = import.meta.env.VITE_API_KEY;
// const myKey: string = "ee1f69ee4cecf91c1cd8f780376bf554";

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesHttpResponse[]> => {
  const url = `${axios.defaults.baseURL}/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  const params = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  try {
    const response = await axios.get(url, params);

    return response.data.results || [];
  } catch {
    console.error("Помилка запиту:");
    return [];
  }
};

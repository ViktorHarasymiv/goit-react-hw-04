import { useState, useEffect } from "react";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

import styles from "./App.module.css";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  // STATE

  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movie, setMovie] = useState<Movie | null>(null);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  // MODAL FUNCTION

  function isActive(): void {
    setIsOpen((prev) => !prev);
    if (isOpen == true && movie != null) setMovie(null);
  }

  function onSelect(params: Movie): void {
    setMovie(params);
    isActive();
  }

  // SEARCH
  const handleSearch = async (search: string): Promise<void> => {
    setTotalPages(0);
    setPage(1);
    setSearch(search);
  };

  // Queries

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles", search, page],
    queryFn: () => fetchMovies(search, page),
    enabled: search !== "",

    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data) {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    }
  }, [data]);

  return (
    <div className={styles.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {data?.results.length == 0 && (
        <p>
          No articles were found for your query, please enter another value.
        </p>
      )}
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isSuccess && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={onSelect} />
      )}
      {isOpen && <MovieModal onClose={isActive} movie={movie} />}
    </div>
  );
}

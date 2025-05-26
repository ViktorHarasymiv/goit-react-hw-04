import style from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (item: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={style.grid}>
      {/* Набір елементів списку з фільмами */}
      {movies.map((item) => {
        return (
          <li
            onClick={() => {
              onSelect(item);
            }}
            key={item.id}
          >
            <div className={style.card}>
              <img
                className={style.image}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt="movie title"
                loading="lazy"
              />
              <h2 className={style.title}>{item.title}</h2>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

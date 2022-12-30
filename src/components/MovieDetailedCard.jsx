import styles from "./Movie.module.css";
import { Poster } from "./Poster";

export function MovieDetailedCard({ movie }) {
  return (
    <article className={styles.card}>
      <header>
        <div className={styles.content}>
          <Poster src={movie?.Poster} />
          <div className={styles.contentInfo}>
            <strong>{movie?.Title}</strong>
            <span>Year: {movie?.Year}</span>
            <span>Rated: {movie?.Rated}</span>
            <span>Released: {movie?.Released}</span>
            <span>Runtime: {movie?.Runtime}</span>
            <span>Genre: {movie?.Genre}</span>
            <span>Director: {movie?.Director}</span>
            <span>Writer: {movie?.Writer}</span>
            <span>Actors: {movie?.Actors}</span>
            <span>Plot: {movie?.Plot}</span>
            <span>Language: {movie?.Language}</span>
            <span>Country: {movie?.Country}</span>
            <span>Awards: {movie?.Awards}</span>
            <span>Metascore: {movie?.Metascore}</span>
            <span>IMDB Rating: {movie?.imdbRating}</span>
            <span>Box Office: {movie?.BoxOffice}</span>
          </div>
        </div>
      </header>
    </article>
  );
}

import { Header } from "./Header";
import { MovieDetailedCard } from "./MovieDetailedCard";
import { Sidebar } from "./Sidebar";

import styles from "./MovieDetailed.module.css";

import "../global.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const baseURL = "https://www.omdbapi.com/?i=";

const apiKey = "&apikey=676ea1a";

export function MovieDetailed() {
  const id = useParams().id;
  const [movie, setMovie] = useState();

  useEffect(() => {
    const omdbapi = `${baseURL}${id}${apiKey}`;
    fetch(omdbapi)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <MovieDetailedCard
            movie={movie}
          />
        </main>
      </div>
    </div>
  );
}

import { Header } from './Header';
import { Movie } from './Movie';
import { Sidebar } from './Sidebar';
import { Search } from './Search';

import styles from './Home.module.css'

import '../global.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';

const baseURL = 'https://www.omdbapi.com/?s=';

const apiKey = '&apikey=676ea1a';

export function Home() {
  const [token, setToken] = useContext(AuthContext);

  useEffect(() => {
    setToken([]);
  }, [])
  
  const [movies, setMovies] = useState([]);
  
  function searchMovies(movieInputValue) {
    const movieToSearch = movieInputValue.split(' ').join('+');
    const omdbapi = `${baseURL}${movieToSearch}${apiKey}`;
    fetch(omdbapi)
      .then(response => response.json())
      .then(data => {
        const dataFetched = data.Search;
        const onlyMovies = dataFetched.filter((movie) => {
          return movie.Type === 'movie'
      })
        setMovies(onlyMovies)
      });
  }

  return (
    <div>
      {token}
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Search onSearch={searchMovies}/>
          {movies.map(movie => {
            return (
              <Movie 
                key={movie.imdbID}
                id={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

import { Header } from './Header';
import { Movie } from './Movie';
import { Sidebar } from './Sidebar';
import { Search } from './Search';

import styles from './Home.module.css'

import '../global.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

const baseURL = 'https://www.omdbapi.com/?s=';

const tstapi = 'https://tstapi.ffcloud.com.br/';

const apiKey = '&apikey=676ea1a';

export function Home() {
  const navigate = useNavigate();

  const [token, setToken] = useContext(AuthContext);

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if(token === ''){
      navigate('/');
    }
    if (token) {
      async function fetchUser() {
          const res = await fetch(tstapi + 'auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const json = await res.json();
            setUser(json);
          }
      }
      fetchUser();
    }
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

  function logOut() {
    setToken('');
    localStorage.setItem('token', '');
    navigate('/');
  }

  return (
    <>
      {token !== '' && (
      <div>
        <Header />
        <div className={styles.wrapper}>
          <Sidebar user={user} onLogOut={logOut}/>
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
      )}
    </>
  )
}

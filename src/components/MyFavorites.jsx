import { Header } from "./Header";
import { MovieDetailedCard } from "./MovieDetailedCard";
import { Sidebar } from "./Sidebar";

import styles from "./MyFavorites.module.css";

import "../global.css";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';


const baseURL = "https://www.omdbapi.com/?i=";

const tstapi = 'https://tstapi.ffcloud.com.br/';

const apiKey = "&apikey=676ea1a";

export function MyFavorites() {
  const [favoritesMovies, setFavoritesMovies] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

 

  async function fetchFavorites(){
    const res = await fetch(tstapi + 'favorites', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const json = await res.json();
      const imdbIDsFetched = json.favorites.map((item) => {
        return item.imdbID
      })
      const movieList = [];
        for (const id  of imdbIDsFetched) {
            const omdbapi = `${baseURL}${id}${apiKey}`;
            await fetch(omdbapi)
                .then((response) => response.json())
                .then((data) => {
                    movieList.push(data)
            });
    }
    setFavoritesMovies(movieList)
    }
  }

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

  function logOut() {
    setToken('');
    localStorage.setItem('token', '');
    navigate('/');
  }

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
      <Sidebar user={user} onLogOut={logOut}/>
        <main>
            {favoritesMovies.map((movie) => {
                return (
                <MovieDetailedCard 
                    key={movie.imdbID}
                    movie={movie}
                />
            )
            })}
        </main>
      </div>
    </div>
  );
}

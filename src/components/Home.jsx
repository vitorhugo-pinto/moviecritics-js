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

  const [favorites, setFavorites] = useState([]);

  const [movies, setMovies] = useState([]);

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
  
  useEffect(()=>{
    fetchFavorites()
  },[favorites])

  async function fetchFavorites(){
    const res = await fetch(tstapi + 'favorites', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const json = await res.json();
      const imddIDs = json.favorites.map((item) => {
        return item.imdbID
      })
      setFavorites(imddIDs)
    }
  }

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

  async function handleFavorites(id, isFavorite) {
    if(!isFavorite){
      const data = {imdbID: id}
      const res = await fetch(tstapi + 'favorites', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      })
      if (res.ok) {
        fetchFavorites
      }
    }
    else if(isFavorite) {
      const res = await fetch(tstapi + 'favorites/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        }
      })
      if (res.ok) {
        fetchFavorites
      }
    }
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
              if(favorites.includes(movie.imdbID)){
                return (
                  <Movie 
                    key={movie.imdbID}
                    id={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    isFavorite={true}
                    onHandleFavorite={handleFavorites}
                  />
                )    
              } else {
                return (
                  <Movie 
                    key={movie.imdbID}
                    id={movie.imdbID}
                    title={movie.Title}
                    year={movie.Year}
                    poster={movie.Poster}
                    isFavorite={false}
                    onHandleFavorite={handleFavorites}
                  />
                )
              }
            })}
          </main>
        </div>
      </div>
      )}
    </>
  )
}

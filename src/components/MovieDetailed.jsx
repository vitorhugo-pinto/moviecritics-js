import { Header } from "./Header";
import { MovieDetailedCard } from "./MovieDetailedCard";
import { Sidebar } from "./Sidebar";

import styles from "./MovieDetailed.module.css";

import "../global.css";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import { UserContext } from '../UserContext';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const baseURL = "https://www.omdbapi.com/?i=";

const tstapi = 'https://tstapi.ffcloud.com.br/';

const apiKey = "&apikey=676ea1a";

export function MovieDetailed() {
  const id = useParams().id;

  const [movie, setMovie] = useState();

  const [ reviewTextAreaValue, setReviewTextAreaValue ] = useState('');

  function handleAddNewReview() {
    event.preventDefault();

    const reviewJson =
    {
      comment: reviewTextAreaValue,
      stars: 5
    };

    postReview(reviewJson);

    setReviewTextAreaValue('');
  };

  function handleReviewTextAreaValueChange() {
    setReviewTextAreaValue(event.target.value);
}

  useEffect(() => {
    const omdbapi = `${baseURL}${id}${apiKey}`;
    fetch(omdbapi)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      });
  }, []);

  const navigate = useNavigate();

  const [token, setToken] = useContext(AuthContext);

  const [user, setUser] = useContext(UserContext);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (token === '') {
      navigate('/');
    }
    if (token) {
      fetchUser();
      fetchReviews();
    }
  }, [])

  async function postReview(review) {
    const res = await fetch(tstapi + 'reviews/' + id, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    });
    if(res.ok){
      fetchReviews();
    }
  }

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

  async function fetchReviews() {
    const res = await fetch(tstapi + 'reviews/' + id, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (res.ok) {
      const json = await res.json();
      setReviews(json.reviews);
    }
  }

  function logOut() {
    setToken('');
    localStorage.setItem('token', '');
    navigate('/');
  }

  const isReviewTextAreaValueEmpty = reviewTextAreaValue.length === 0;

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar user={user} onLogOut={logOut} />
        <main>
          <MovieDetailedCard
            movie={movie}
          />
          <form onSubmit={handleAddNewReview} className={styles.commentForm}>
            <strong>Leave a review</strong>

            <textarea
              name='reviewTextArea'
              placeholder='Speak your mind'
              value={reviewTextAreaValue}
              onChange={handleReviewTextAreaValueChange}

              required
            />

            <footer>
              <button
                type='submit'
                disabled={isReviewTextAreaValueEmpty}
              >
                Post
              </button>
            </footer>

          </form>
          <div className={styles.content}>
            <header>
              Reviews
            </header>
            {reviews.map((review) => {
              return (
                <div key={review.comment} className={styles.commentContainer}>
                  <span>Author: {review.user.name}</span>
                  <span>{review.comment}</span>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

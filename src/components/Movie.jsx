import { useNavigate } from 'react-router-dom';
import styles from './Movie.module.css';
import { Poster } from './Poster';
import { Star } from 'phosphor-react';

export function Movie({id, title, year, poster}) {
    const navigate = useNavigate();

    function toDetails(id){
        navigate('/movie-details/' + id)
    }

    return (
        <article className={styles.card}>
            <header>
                <div className={styles.content}>
                    <Poster src={poster} />
                    <div className={styles.contentInfo}>
                        <header>
                            <a href='#'>
                                <Star size={20} />
                            </a>
                        </header>
                        <strong>{title}</strong>
                        <span>{year}</span>
                        <button onClick={() => toDetails(id)}>Show more</button>
                    </div>
                </div>
            </header>
        </article>
    );
}
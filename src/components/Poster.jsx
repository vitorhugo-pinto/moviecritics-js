import styles from './Poster.module.css';

export function Poster ( { src }) {
    const missingPoster = 'https://images.unsplash.com/photo-1497514440240-3b870f7341f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=40'

    return (
        <img 
            className={styles.poster}
            src={src === 'N/A' ? missingPoster : src}
        />
    );
}
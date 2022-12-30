import styles from './Header.module.css';
import imdbLogo from '../assets/imdb-icon.svg'

export function Header() {
    return (
        <header  className={styles.header}>
            <img src={imdbLogo} alt="Logo da IMDB"></img>
        </header>
    );
}
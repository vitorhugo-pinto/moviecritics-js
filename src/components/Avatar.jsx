import styles from './Avatar.module.css';

export function Avatar ( { hasBorder = true, ...props}) {
    return (
        <img 
            className={hasBorder ? styles.avatar : styles.avatarBorderless}
            {...props}
        />
    );
}
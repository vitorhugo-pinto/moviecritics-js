import { Avatar } from './Avatar';
import { SignOut, FolderStar, HouseLine} from 'phosphor-react';


import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

export function Sidebar({user, onLogOut}) {
    const navigate = useNavigate()

    function handleLogOut(){
        onLogOut();
    }

    function goToMyFavorites(){
        navigate('/my-favorites')
    }

    function goToHome(){
        navigate('/home')
    }

    

    return (
        <aside className={styles.sidebar}>
            <img 
                className={styles.cover}
                src='https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=40'
            />
            <div className={styles.profile}>
                <Avatar 
                    src='https://images.unsplash.com/photo-1633613286991-611fe299c4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=40'
                />
                <strong>{user.name}</strong>
                <span>{user.email}</span>
                <span>
                    <a onClick={goToHome}>
                        <HouseLine size={24} />
                        Home
                    </a>
                </span>
                <span>
                    <a onClick={goToMyFavorites}>
                        <FolderStar size={24} weight="fill" />
                        My favs
                    </a>
                </span>
            </div>
            <footer>
                <a onClick={handleLogOut}>
                    <SignOut size={20} />
                    Log out
                </a>
            </footer>
        </aside>
    );
}
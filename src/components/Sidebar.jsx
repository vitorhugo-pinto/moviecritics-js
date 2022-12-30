import { Avatar } from './Avatar';
import { SignOut } from 'phosphor-react';


import styles from './Sidebar.module.css';

export function Sidebar({user, onLogOut}) {
    function handleLogOut(){
        onLogOut();
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
            </div>
            <footer>
                <a onClick={handleLogOut} href='#'>
                    <SignOut size={20} />
                    Log out
                </a>
            </footer>
        </aside>
    );
}
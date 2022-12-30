import { useNavigate } from "react-router-dom";
import { ArrowCircleLeft } from 'phosphor-react';

import styles from './GoBackButton.module.css'

export function GoBackButton() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.content}>
            <button onClick={goBack} className='back-button'>
                <ArrowCircleLeft size={24} />
                Go Back
            </button>
        </div>
    );
}
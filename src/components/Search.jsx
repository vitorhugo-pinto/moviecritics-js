import { MagnifyingGlass } from 'phosphor-react';
import { useState } from 'react';
import styles from './Search.module.css';

export function Search({ onSearch }) {
    const [ searchInputValue, setSearchInputValue ] = useState('');

    function handleSearchInputChange () {
        event.target.setCustomValidity('');

        setSearchInputValue(event.target.value);
    }

    function handleSearch() {
        onSearch(searchInputValue)
    }


    return (
        <div className={styles.search}>
            <input
                type="text"
                value={searchInputValue}
                onChange={handleSearchInputChange}
                placeholder="Search a movie by its title ..."
            />
            <button onClick={handleSearch}>
                <MagnifyingGlass size={24} />
            </button>

        </div>
    );
}

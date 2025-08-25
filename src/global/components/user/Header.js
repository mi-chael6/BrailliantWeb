import React, { useState, useEffect } from 'react';
import './Header.css'
import DropDownMenu from './DropDownMenu';
import { Link, useNavigate } from "react-router-dom";

export default function Header({ searchQuery, setSearchQuery, searchBar, page }) {

    const navigate = new useNavigate()

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {

        setUsers(JSON.parse(localStorage.getItem('users')));

    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    return (
        <>
            <div className='header-container'>
                {
                    searchBar ? (
                        <input
                            className="header-search"
                            type="text"
                            placeholder="Find a Book"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    ) : (
                        <label>{page}</label>
                    )
                }

                <nav onClick={toggleDropdown}>
                    <img
                        className="icon"
                        src={
                            users.user_img
                                ? users.user_img
                                : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                        }
                        alt="Profile"
                    />

                    <p>{users.user_fname}</p>
                </nav>
            </div>
            {showDropdown && <DropDownMenu toggleDropdown={toggleDropdown} />}
        </>
    );
}

import React, { useState, useEffect } from 'react';
import './DashboardHeader.css';
import DropDownMenu from './DropDownMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DashboardHeader() {

    const navigate = new useNavigate()


    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [book, setAllBooks] = useState([])

    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allbooks')
            .then((response) => {
                setAllBooks(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])



    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };


    return (
        <>
            <div className="dashboardheader-container">
                <div className="dashboardheader-navigation">
                    <div>
                        <input className="dashboardheader-search" type="text" placeholder="Find a book" />
                    </div>
                    

                    <nav onClick={toggleDropdown}>
                        <img
                            className='icon'
                            src={
                                users.user_img
                                    ? users.user_img
                                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            }

                        />
                        <p>{users.user_fname}</p>
                    </nav>
                </div>

                {showDropdown && <DropDownMenu />}

                <div className="dashboardheader-navigation">
                    <label>Library</label>
                    <nav>
                        <a href="/library">All Books</a>
                    </nav>
                </div>

                <div className="dashboardheader-books">
                    {book.books?.slice(0, 5).map((book) => (

                        <img

                            src={book.book_img}
                            className='dashboardheader-book'
                            onClick={() => { navigate('/book/detail', { state: { book: book } }); }}

                        />
                    ))}


                </div>
            </div>
        </>
    );
}

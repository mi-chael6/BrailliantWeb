import React, { useState, useEffect } from 'react';
import './Analytics.css'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Analytics() {
    const page="Analytics"
    const searchBar = false
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    const [studentcount, setStudentCount] = useState(0)
    const [booksCount, setBooksCount] = useState(0)
    const [topBooks, setTopBooks] = useState([]);


    const navigate = new useNavigate()

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))

        axios.get('https://brailliantweb.onrender.com/api/students/count')
            .then((response) => {
                setStudentCount(response.data.count);
            })
            .catch((error) => {
                console.error('Error fetching student count:', error);
            });

        axios.get('https://brailliantweb.onrender.com/api/books/count')
            .then((response) => {
                setBooksCount(response.data.count);
            })
            .catch((error) => {
                console.error('Error fetching student count:', error);
            });
        axios.get('https://brailliantweb.onrender.com/api/books/ranked')
            .then((response) => {
                setTopBooks(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
            });


    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='analytics-container'>
                <div className='analytics-header'>
                    <Header page={page} searchBar={searchBar} />

                </div>
                {showDropdown && <DropDownMenu />}
                <div className='analytics-body'>
                    <div className='analytics'>
                        <div className='analytics-details'>
                            <div className='analytics-student'>
                                <label className='analytics-title'>Students</label>
                                <div className='students-count'>
                                    <label className='analytics-count'>{studentcount}</label>
                                    <img src={require('../assets/Users.png')} />
                                </div>
                            </div>
                            <div className='analytics-books-approved'>
                                <label className='analytics-title'>Books Approved</label>
                                <div className='students-count'>
                                    <label className='analytics-count'>{booksCount}</label>
                                    <img src={require('../assets/Book open.png')} />
                                </div>
                            </div>
                            <div className='analytics-completion-rate'>
                                <label className='analytics-title'>Completion Rate</label>
                                <div className='students-count'>
                                    <label className='analytics-count'>--%</label>
                                    <img src={require('../assets/check.png')} />
                                </div>
                            </div>
                        </div>
                        <div className='analytics-performance'>
                            <div className='analytics-cp'>
                                <label>Class Performance</label>
                                <div className='cp'>

                                </div>
                            </div>
                            <div className='analytics-tb'>
                                <label>Top Books</label>
                                <div className='tb'>
                                    <ul className="top-books-list">
                                        {topBooks.length > 0 ? (
                                            topBooks.map((book, index) => (
                                                <li key={book._id}>
                                                    <span>{index + 1}. {book.book_title}</span>  {book.book_count} views
                                                </li>
                                            ))
                                        ) : (
                                            <li>No data available</li>
                                        )}
                                    </ul>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

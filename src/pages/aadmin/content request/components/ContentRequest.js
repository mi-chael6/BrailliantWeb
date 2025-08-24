import React, { useState, useEffect } from 'react';
import './ContentRequest.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ContentRequest() {

    const navigate = new useNavigate()


    const [selectedRowId, setSelectedRowId] = useState(null);
    const [allBooks, setAllBooks] = useState([]);
    const pendingBooks = allBooks.books?.filter(book => !book.request_book_status) || [];
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allrequestbooks')
            .then((response) => {
                setAllBooks(response.data)
                console.log('this books', response.data)

            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-cr-container'>
                <div className='admin-cr-header'>
                    <AdminHeader page={"Content Request"} />
                </div>
                <div className='admin-cr-body'>
                    <div className='admin-content-request'>

                        <div className='admin-cr-accounts'>
                            <label className='all-req'>All Request</label>
                            <div className='admin-cr-request'>
                                <img className='cr-img' src={require('../assets/book.png')} />
                                <div className='cr-details'>
                                    <label className='cr-count'>{pendingBooks.length}</label>
                                    <label className='cr-text'>Pending Request</label>
                                </div>

                            </div>
                        </div>
                        <div className='admin-request'>
                            <div className='admin-request-actions'>
                                <input
                                    placeholder='Search books'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                />
                                <div className='admin-request-buttons'>
                                    {/*<button>Remove <img src={require('../assets/delete.png')} /></button>*/}
                                </div>
                            </div>
                            <div className='cr-table'>
                                <table className='admin-cr-table'>
                                    <tr>
                                        <th>Request ID</th>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>Genre</th>
                                        <th>Request By</th>
                                    </tr>
                                    {allBooks.books
                                        ?.filter(
                                            (book) =>
                                                book.request_book_status === '' &&
                                                (
                                                    book.request_book_title?.toLowerCase().includes(searchQuery) ||
                                                    book.request_book_author?.toLowerCase().includes(searchQuery) ||
                                                    book.request_book_genre?.toLowerCase().includes(searchQuery) ||
                                                    book.request_by?.toLowerCase().includes(searchQuery)
                                                )
                                        )
                                        .map((book) => (
                                            <tr
                                                key={book._id}
                                                onClick={() => setSelectedRowId(book._id)}
                                                className={selectedRowId === book._id ? "highlighted" : ""}
                                            >
                                                <td>{book._id}</td>
                                                <td>{book.request_book_title}</td>
                                                <td>{book.request_book_author}</td>
                                                <td>{book.request_book_genre}</td>
                                                <td>{book.request_by}</td>
                                                <td>
                                                    <button onClick={() => navigate('/admin/approval/book', { state: { book: book } })}>
                                                        View Details <img src={require('../assets/edit.png')} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}

                                </table>
                            </div>

                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

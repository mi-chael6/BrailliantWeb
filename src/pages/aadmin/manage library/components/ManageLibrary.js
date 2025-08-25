import React, { useState, useEffect } from 'react';
import './ManageLibrary.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteConfirmationModal from '../../../../global/components/user/DeleteConfirmationModal';

export default function ManageLibrary() {

    const navigate = new useNavigate()
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [allBooks, setAllBooks] = useState([])
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allbooks')
            .then((response) => {
                console.log(response.data)
                setAllBooks(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    const toggleConfirmation = () => {
        setShowConfirmation((prev) => !prev);
    };

    const handleRemove = () => {
        axios.delete(`https://brailliantweb.onrender.com/api/delete/book/${selectedRowId}`)
            .then((response) => {
                window.location.reload();
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-ml-container'>
                <div className='admin-ml-header'>
                    <AdminHeader page={"Manage Library"} />
                </div>
                <div className='admin-ml-body'>
                    {showConfirmation && (
                        <DeleteConfirmationModal
                            onDelete={handleRemove}
                            onCancel={toggleConfirmation}
                        />
                    )}
                    <div className='admin-manage-library'>
                        <div className='admin-ml-upload'>
                            <label>All Books</label>
                            <button
                                className='ml-upload-btn'
                                onClick={() => { navigate('/admin/upload-book') }}
                            >
                                <img src={require('../assets/upload.png')} />UPLOAD BOOKS</button>
                        </div>
                        <div className='admin-all-books'>
                            <div className='admin-actions'>
                                <input
                                    placeholder='Search books'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                />
                                <div></div>
                                <div className='admin-ml-buttons'>
                                    <button onClick={() => {
                                        if (!selectedRowId) {
                                            alert("Please select a book.");
                                            return;
                                        }
                                        navigate('/admin/view/book', { state: { book: selectedRowId } })


                                    }}>View Details <img src={require('../assets/edit.png')} /></button>
                                    <button onClick={() => {
                                        if (!selectedRowId) {
                                            alert("Please select a book.");
                                            return;
                                        }
                                        toggleConfirmation()
                                    }}>Remove <img src={require('../assets/delete.png')} /></button>
                                </div>
                            </div>
                            <div className='admin-table-cont'>
                                <table className='admin-ml-table'>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Genre</th>
                                            <th>Description</th>
                                            <th>Last Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allBooks.books
                                            ?.filter((book) =>
                                                book.book_title?.toLowerCase().includes(searchQuery) ||
                                                book.book_author?.toLowerCase().includes(searchQuery) ||
                                                book.book_genre?.toLowerCase().includes(searchQuery))
                                            .map((book) => (
                                                <tr
                                                    key={book._id}
                                                    onClick={() => setSelectedRowId(book._id)}
                                                    className={selectedRowId === book._id ? "highlighted" : ""}
                                                >
                                                    <td>{book.book_title}</td>
                                                    <td>{book.book_author}</td>
                                                    <td>{book.book_genre}</td>
                                                    <td>{book.book_description}</td>
                                                    <td>{new Date(book.book_last_modified).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

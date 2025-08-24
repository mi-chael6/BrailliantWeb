import React, { useState, useEffect } from 'react';
import './Library.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'



export default function Library() {
    const searchBar = true

    const navigate = useNavigate()

    const [book, setAllBooks] = useState([])
    const [searchQuery, setSearchQuery] = useState('')


    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allbooks')
            .then((response) => {
                setAllBooks(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])

    const filteredBooks = book.books?.filter((b) =>
        b.book_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='library-container'>
                <div className='library-header'>
                    <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchBar={searchBar} />
                </div>
                <div className='library-body'>
                    <div className='library'>
                        <label>Library</label>
                        <div className='library-books'>

                            {filteredBooks?.map((book) => (
                                <img
                                    key={book._id}
                                    src={book.book_img}
                                    className='library-book'
                                    onClick={() => {
                                        navigate('/book/detail', { state: { book: book } });
                                    }}
                                />
                            ))}

                        </div>
                    </div>
                    <div className='library-side'>
                        <label>Braille Characters</label>
                        <div className='library-braille-1'>
                            <div className='library-module'>
                                <img src={require('../assets/Module 1.png')} />
                                <img src={require('../assets/Module 2.png')} />
                            </div>

                            <label>Grade 1 Braille</label>
                        </div>
                        <div className='library-braille-2'>
                            <div className='library-module'>
                                <img src={require('../assets/Module 1.png')} />
                                <img src={require('../assets/Module 3.png')} />
                            </div>
                            <label>Grade 2 Braille</label>
                        </div>
                        <label>Need more?</label>
                        <p>Upload your own learning materials and get it approved!</p>
                        <button onClick={() => { navigate('/upload') }}><img src={require('../assets/upload.png')} />UPLOAD BOOKS</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

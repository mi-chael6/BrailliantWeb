import React, { useState, useEffect } from 'react';
import './Library.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import { useNavigate } from 'react-router-dom';
import Loading from "../../../../global/components/user/Loading";
import axios from 'axios'

export default function Library() {
    const searchBar = true;
    const navigate = useNavigate();

    const [book, setAllBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState(''); 
    const [genres, setGenres] = useState([]); 

    useEffect(() => {
        setLoading(true);
        axios.get('https://brailliantweb.onrender.com/api/allbooks')
            .then((response) => {
                setLoading(false);
                setAllBooks(response.data);
                console.log(response.data)
                const allGenres = response.data.books?.map((b) => b.book_genre);
                const uniqueGenres = [...new Set(allGenres)];
                setGenres(uniqueGenres);
            })
            .catch((error) => {
                console.log("eto ang error mo " + error);
            });

    }, []);

    const filteredBooks = book.books
        ?.filter((b) =>
            b.book_title?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        ?.filter((b) =>
            selectedGenre ? b.book_genre === selectedGenre : true
        );

    return (
        <div className='container'>
            {loading && <Loading />}
            <SideNavigation />
            <div className='library-container'>
                <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchBar={searchBar} />
                <div className='library-body'>
                    <div className='library'>
                        <label className='library-title'>Library</label>

                        <select
                            className='library-filter'
                            value={selectedGenre}
                            onChange={(e) => setSelectedGenre(e.target.value)}
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>

                        <div className='library-books'>
                            {filteredBooks?.map((book) => (
                                <div className='library-book-container' key={book._id}>
                                    <div className='library-book'>
                                        <img
                                            src={book.book_img || require('../assets/noimg.png')}
                                            className="the-book"
                                            onClick={() => {
                                                navigate('/book/detail', { state: { book: book } });
                                            }}
                                            alt={book.book_title}
                                        />
                                    </div>
                                    <label>{book.book_title}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='library-side'>
                        <label>Braille Characters</label>
                        <div className='library-braille-1' onClick={() => navigate("/braille/1")}>
                            <div className='library-module'>
                                <img src={require('../assets/Module 1.png')} />
                                <img src={require('../assets/Module 2.png')} />
                            </div>
                            <label>Grade 1 Braille</label>
                        </div>
                        <div className='library-braille-2' onClick={() => navigate("/braille/2")}>
                            <div className='library-module'>
                                <img src={require('../assets/Module 1.png')} />
                                <img src={require('../assets/Module 3.png')} />
                            </div>
                            <label>Grade 2 Braille</label>
                        </div>
                        <label>Need more?</label>
                        <p>Upload your own learning materials and get it approved!</p>
                        <button onClick={() => { navigate('/upload') }}>
                            <img src={require('../assets/upload.png')} />UPLOAD BOOKS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

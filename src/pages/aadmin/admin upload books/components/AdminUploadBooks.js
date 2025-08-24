import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminUploadBooks.css'
import axios from 'axios'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'


export default function AdminUploadBooks() {

    const navigate = new useNavigate()

    const [newBook, setNewBook] = useState({
        book_title: '',
        book_author: '',
        book_genre: '',
        book_date_published: '',
        book_level: '',
        book_description: '',
        book_img: '',
        book_file: '',
    });


    const [file, setFile] = useState('')
    const [user, setUser] = useState([])
    const [selectedImage, setSelectedImage] = useState('')

    const clearForm = () => {
        setNewBook({
            book_title: '',
            book_author: '',
            book_genre: '',
            book_date_published: '',
            book_level: '',
            book_description: '',
            book_img: '',
            book_file: '',
        });
    };

    const handleUploadBook = async () => {
        try {

            const updatedBook = {
                ...newBook,
                book_last_modified: new Date(),
            };

            const response = await axios.post('https://brailliantweb.onrender.com/api/newbook', updatedBook);
            const createdBook = response.data.book;

            console.log("Book created:", createdBook);
            alert("Book created successfully!");

            if (file) {
                await submitImage(createdBook._id);
                await submitimage(createdBook._id);
            }


            clearForm();
            navigate(-1)

        } catch (error) {
            console.error(error);
            alert("Failed to upload book");
        }
    };


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('users')))
    }, [])

    const submitImage = async (bookId) => {
        try {
            const formData = new FormData();
            formData.append('bookFile', file);

            const result = await axios.put(`https://brailliantweb.onrender.com/upload-files/${bookId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("File uploaded:", result.data);
        } catch (error) {
            console.error("File upload error:", error);
        }
    };

    const [image, setImage] = useState(null)

    const submitimage = async (bookId) => {

        const formData = new FormData()
        formData.append('bookImage', image);

        const result = await axios.put(
            `https://brailliantweb.onrender.com/upload-image/${bookId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            }

        )
        console.log("File uploaded:", result.data);

    }

    const onInputChange = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
        const file = e.target.files?.[0]
        setSelectedImage(
            file ? URL.createObjectURL(file) : undefined
        )
    }



    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='upload-container'>
                <div className='upload-header'>
                    <AdminHeader page={"Upload Books"} />
                </div>
                <div className='upload-body'>
                    <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>
                    <label className='up'>Upload Books</label>

                    <form className="uploadmaterial-container" onSubmit={(e) => {
                        e.preventDefault()
                        handleUploadBook()


                    }}>
                        <div className='left-container'>

                            <img
                                className='upload-image-container'
                                src={selectedImage}
                            />

                            <div>

                                <label for="image-upload" className='upload-image'>
                                    Upload Book Cover
                                </label>

                                <input
                                    id='image-upload'
                                    type='file'
                                    accept='image/*'
                                    onChange={onInputChange}
                                    required
                                />
                            </div>


                            <div className='lower-left-container'>

                                <label for="file-upload" class="custom-file-upload">
                                    <img src={require('../assets/file.png')} /> Attach file here
                                </label>
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept='application/pdf'
                                    required
                                    onChange={(e) => setFile(e.target.files[0])}

                                />


                            </div>
                        </div>





                        <div className='right-container'>
                            <p>Title</p>
                            <input
                                required
                                type='text'
                                placeholder='Enter book title here'
                                value={newBook.book_title}
                                onChange={(e) => setNewBook({ ...newBook, book_title: e.target.value })}
                            />
                            <p>Author</p>
                            <input
                                required
                                type='text'
                                placeholder='Enter author name here'
                                value={newBook.book_author}
                                onChange={(e) => setNewBook({ ...newBook, book_author: e.target.value })}
                            />
                            <p>Genre</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter genre here'
                                value={newBook.book_genre}
                                onChange={(e) => setNewBook({ ...newBook, book_genre: e.target.value })}
                            />
                            <p>Level</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter book level here'
                                value={newBook.book_level}
                                onChange={(e) => setNewBook({ ...newBook, book_level: e.target.value })}
                            />
                            <p>Description</p>
                            <input
                                required
                                type='text'
                                placeholder=' Enter book level here'
                                value={newBook.book_description}
                                onChange={(e) => setNewBook({ ...newBook, book_description: e.target.value })}
                            />
                            <p>Date Published</p>
                            <input
                                required
                                type='date'
                                placeholder='MM/DD/YYYY'
                                value={newBook.book_date_published}
                                onChange={(e) => setNewBook({ ...newBook, book_date_published: e.target.value })}
                            />
                            <button type='submit'><img src={require('../assets/upload.png')} /> Upload Book</button>
                        </div>
                    </form>








                </div>
            </div>
        </div>
    )
}

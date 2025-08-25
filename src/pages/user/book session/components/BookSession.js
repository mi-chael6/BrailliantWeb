import React, { useState, useEffect } from 'react';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header'
import './BookSession.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SummaryModal.css"

import './TextToBraille.css'
import convertTextToBrailleDots from "../components/api/translate";
import BrailleLetter from "./index";


export default function BookSession() {

    const navigate = useNavigate()

    const location = useLocation();
    const { book, studentId } = location.state;
    const selectedBook = book.book;


    const [file, setFile] = useState(null)
    const [resultText, setResultText] = useState('')

    const [confirmationModal, setConfirmationModal] = useState(false)
    const [summaryModal, setSummaryModal] = useState(false)

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) {
        navigate(-1)
    }

    //TTB

    const [text, setText] = useState("hello");
    const [loading, setLoading] = useState(false);
    const [brailleDots, setBrailleDots] = useState("");
    const [bookData, setBookData] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0);
    const CHUNK_SIZE = 8;

    const currentChunk = resultText.slice(currentIndex, currentIndex + CHUNK_SIZE);


    ////////////////////

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const result = convertTextToBrailleDots(currentChunk);
        setBrailleDots(result);
        setLoading(false);
    }
    ///////////-----------TIMER-----------///////////////////////


    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);


    useEffect(() => {
        let startTime = Date.now();

        const updateElapsed = () => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            setSeconds(elapsed);
        };

        updateElapsed();
        const id = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        setIntervalId(id);

        return () => clearInterval(id);
    }, []);


    const formatTime = (secs) => {
        const h = String(Math.floor(secs / 3600)).padStart(2, "0");
        const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
        const s = String(secs % 60).padStart(2, "0");
        return `${h}:${m}:${s}`;
    };
    ////////////////////////////////////////////

    useEffect(() => {
        if (!selectedBook?.book_file) return;

        fetch('https://brailliantweb.onrender.com/extract-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pdfUrl: selectedBook.book_file })
        })
            .then(res => res.text())
            .then(text => {
                const trimmedText = text.trim();
                setResultText(trimmedText);

                const initialChunk = trimmedText.slice(0, 8);
                const result = convertTextToBrailleDots(initialChunk);
                setBrailleDots(result);

            })
            .catch(err => console.error('Error extracting text:', err));
    }, []);

    useEffect(() => {
        const currentChunk = resultText.slice(currentIndex, currentIndex + 8);
        const result = convertTextToBrailleDots(currentChunk);
        setBrailleDots(result);

        const brailleArray = result.split(" ");
        const formatted = brailleArray.map((dots, index) => `M${index + 1}:${dots}`).join('\n');
        console.log(formatted)
        /*
        axios.post('https://brailliantweb.onrender.com/send-text', {
            message: formatted
        });
        */
    }, [currentIndex, resultText]);



    const endSession = async () => {
        clearInterval(intervalId);

        const BookReadData = {
            book_read_title: selectedBook.book_title,
            book_read_time_elapsed: seconds,
            book_read_date: Date.now(),
            book_read_student_id: studentId
        }
        setBookData(BookReadData)
        await axios.post('https://brailliantweb.onrender.com/api/create/bookread', BookReadData)
            .then((res) => {
                console.log("Book added:", res.data);
            })
            .catch((error) => {
                console.error("Failed to add student", error);
                alert("Failed to add student. Please try again.");
            });

    }

    const togggleConfirmationModal = () => {
        setConfirmationModal(!confirmationModal)
    }

    const togggleSummaryModal = () => {
        setSummaryModal(!summaryModal)
    }

    return (
        <div className='container'>

            {confirmationModal && (
                <div className='modal'>
                    <div className='confirm-overlay' onClick={togggleConfirmationModal}>
                        <div className='confirm-modal-content'>
                            <div className='confirm-loginmodal'>
                                <label className='confirm-head'>Are you sure you want to delete?</label>

                                <div className='confirm-modal-btns'>
                                    <button className='confirm-cancel' onClick={togggleConfirmationModal}>Continue Reading</button>
                                    <button className='confirm-delete' onClick={() => {
                                        endSession()
                                        togggleSummaryModal()
                                    }
                                    }>End Session</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {summaryModal && (
                <div className='summary-modal'>
                    <div className='summary-overlay' onClick={() => {
                        navigate(-1)
                    }}></div>
                    <div className='summary-modal-content'>
                        <div className='summary'>

                            <label className='summary-head'>Session Summary</label>

                            <div className='summary-body'>
                                <label>Date:</label>
                                <label>{new Date(bookData.book_read_date).toLocaleString().split("T")[0]}</label>
                            </div>
                            <div className='summary-body'>
                                <label>Student ID:</label>
                                <label>{studentId}</label>
                            </div>
                            <div className='summary-body'>
                                <label>Book:</label>
                                <label>{selectedBook.book_title}</label>
                            </div>
                            <div className='summary-body'>
                                <label>Time Elapsed:</label>
                                <label>{formatTime(bookData.book_read_time_elapsed)}</label>
                            </div>

                            <button className='summary-btn' onClick={() => {
                                navigate(-1)
                            }
                            }>Proceed</button>




                        </div>
                    </div>
                </div>
            )}





            <div>
                <SideNavigation />
            </div>
            <div className='bs-container'>
                <div className='bs-header'>
                    <Header page={selectedBook.book_title} searchBar={false} />
                </div>
                <div className='bs-body'>
                    <div className='book-session'>
                        <div className='bs-title'>

                            <label>Time Elapsed: {formatTime(seconds)}</label>
                        </div>
                        <div className='bs-translate'>
                            <div className='bs-text'>
                                <div className='bs-page'>
                                    <div className='bs-page-button'>
                                        <button
                                            onClick={() => setCurrentIndex(prev => Math.max(prev - CHUNK_SIZE, 0))}
                                            disabled={currentIndex === 0}
                                        >
                                            <img src={require(`../assets/prev.png`)} />
                                        </button>
                                        <button
                                            onClick={() =>
                                                setCurrentIndex(prev =>
                                                    prev + CHUNK_SIZE < resultText.length ? prev + CHUNK_SIZE : prev
                                                )
                                            }
                                            disabled={currentIndex + CHUNK_SIZE >= resultText.length}

                                        >
                                            <img src={require(`../assets/next.png`)} />
                                        </button>
                                    </div>
                                </div>
                                <div className='highlighted-textarea'>
                                    <span>{resultText.slice(0, currentIndex)}</span>
                                    <span className='highlight'>{resultText.slice(currentIndex, currentIndex + CHUNK_SIZE)}</span>
                                    <span>{resultText.slice(currentIndex + CHUNK_SIZE)}</span>
                                </div>
                            </div>
                            <div className='bs-braille'>
                                <div className='bs-preview'>
                                    <label>Only highlighted chracters are sycned to the display</label>
                                </div>




                                <div className='textarea-braille'>

                                    {brailleDots.split(" ").map((word, index) => (
                                        <BrailleLetter key={index} dots={word} />
                                    ))}

                                </div>




                                <div>
                                    <button className='bs-sync'>SYNC</button>
                                    <button className='bs-end' onClick={togggleConfirmationModal}>END SESSION</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

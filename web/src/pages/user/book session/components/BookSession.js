import React, { useState, useEffect } from 'react';
import SideNavigation from '../../../../global/components/user/SideNavigation';
import Header from '../../../../global/components/user/Header';
import './BookSession.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./SummaryModal.css";
import Loading from '../../../../global/components/user/Loading';
import './TextToBraille.css';
import './ConfirmationModal.css';

import convertTextToBrailleDots from "../components/api/translate";
import BrailleLetter from "./index";

export default function BookSession() {
    const navigate = useNavigate();
    const location = useLocation();
    const { book, studentId } = location.state;
    const selectedBook = book.book;

    const [confirmationModal, setConfirmationModal] = useState(false);
    const [summaryModal, setSummaryModal] = useState(false);

    const user = JSON.parse(localStorage.getItem('users'));
    if (!user) navigate(-1);

    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(false);
    const [brailleDots, setBrailleDots] = useState("");
    const [bookData, setBookData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chunks, setChunks] = useState([]); // store chunk objects
    const [words, setWords] = useState([]); // store full words

    const CHUNK_SIZE = 8;
    const currentChunkObj = chunks[currentIndex] || { part: "", wordIndex: 0, start: 0, end: 0 };

    // Smart chunking: keep track of wordIndex and slice positions
    function chunkTextWithRefs(text, chunkSize) {
        const words = text.split(/\s+/);
        const chunks = [];

        words.forEach((word, wordIndex) => {
            if (word.length <= chunkSize) {
                chunks.push({ part: word, wordIndex, start: 0, end: word.length });
            } else {
                for (let i = 0; i < word.length; i += chunkSize) {
                    chunks.push({
                        part: word.slice(i, i + chunkSize),
                        wordIndex,
                        start: i,
                        end: Math.min(i + chunkSize, word.length)
                    });
                }
            }
        });

        return { words, chunks };
    }

    // Timer
    const [seconds, setSeconds] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    useEffect(() => {
        let startTime = Date.now();
        const id = setInterval(() => {
            const now = Date.now();
            const elapsed = Math.floor((now - startTime) / 1000);
            setSeconds(elapsed);
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

    // Load book text and chunk
    useEffect(() => {
        setLoading(true);
        if (!selectedBook?.book_file) return;

        fetch('https://brailliantweb.onrender.com/extract-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pdfUrl: selectedBook.book_file })
        })
            .then(res => res.text())
            .then(text => {
                const trimmedText = text.trim();
                const { words, chunks } = chunkTextWithRefs(trimmedText, CHUNK_SIZE);
                setWords(words);
                setChunks(chunks);

                if (chunks.length > 0) {
                    setBrailleDots(convertTextToBrailleDots(chunks[0].part));
                }
                setLoading(false);
            })
            .catch(err => console.error('Error extracting text:', err));

        axios.get(`https://brailliantweb.onrender.com/api/student/${studentId}`)
            .then((res) => setStudent(res.data.student));
    }, []);

    useEffect(() => {
        if (chunks.length === 0) return;
        setBrailleDots(convertTextToBrailleDots(currentChunkObj.part));
    }, [currentIndex, chunks]);

    const endSession = async () => {
        clearInterval(intervalId);
        const BookReadData = {
            book_read_title: selectedBook.book_title,
            book_read_time_elapsed: seconds,
            book_read_date: Date.now(),
            book_read_student_id: studentId
        };
        setBookData(BookReadData);
        await axios.post('https://brailliantweb.onrender.com/api/create/bookread', BookReadData);
        await axios.post('https://brailliantweb.onrender.com/summarize-progress', { student_id: studentId });
    };

    const togggleConfirmationModal = () => setConfirmationModal(!confirmationModal);
    const togggleSummaryModal = () => setSummaryModal(!summaryModal);

    return (
        <div className='container'>
            {loading && <Loading />}
            {confirmationModal && (
                <div className='bs-modal'>
                    <div className='bs-confirm-overlay' onClick={togggleConfirmationModal}>
                        <div className='bs-confirm-modal-content'>
                            <div className='bs-confirm-loginmodal'>
                                <label className='bs-confirm-head'>Are you sure you want to end session?</label>
                                <div className='bs-confirm-modal-btns'>
                                    <button className='bs-confirm-cancel' onClick={togggleConfirmationModal}>Continue Reading</button>
                                    <button className='bs-confirm-delete' onClick={() => { endSession(); togggleSummaryModal(); }}>End Session</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {summaryModal && (
                <div className='summary-modal'>
                    <div className='summary-overlay'></div>
                    <div className='summary-modal-content'>
                        <div className='summary'>
                            <label className='summary-head'>Session Summary</label>
                            <div className='summary-body'><label>Date:</label><label>{new Date(bookData.book_read_date).toLocaleString().split("T")[0]}</label></div>
                            <div className='summary-body'><label>Student Name:</label><label>{student.student_fname} {student.student_lname}</label></div>
                            <div className='summary-body'><label>Book:</label><label>{selectedBook.book_title}</label></div>
                            <div className='summary-body'><label>Time Elapsed:</label><label>{formatTime(bookData.book_read_time_elapsed)}</label></div>
                            <button className='summary-btn' onClick={() => navigate(-1)}>Proceed</button>
                        </div>
                    </div>
                </div>
            )}
            <SideNavigation />
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
                                        <button onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} disabled={currentIndex === 0}><img src={require(`../assets/prev.png`)} /></button>
                                        <button onClick={() => setCurrentIndex(prev => prev + 1 < chunks.length ? prev + 1 : prev)} disabled={currentIndex + 1 >= chunks.length}><img src={require(`../assets/next.png`)} /></button>
                                    </div>
                                </div>

                                <div className='highlighted-textarea'>
                                    {words.map((word, idx) => (
                                        <React.Fragment key={idx}>
                                            {idx === currentChunkObj.wordIndex ? (
                                                <span className='highlight-word'>
                                                    {word.slice(0, currentChunkObj.start)}
                                                    <span className='highlight'>{word.slice(currentChunkObj.start, currentChunkObj.end)}</span>
                                                    {word.slice(currentChunkObj.end)}
                                                </span>
                                            ) : (
                                                <span>{word}</span>
                                            )}
                                            {idx < words.length - 1 && " "}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div className='bs-braille'>
                                <div className='bs-preview'><label>Only highlighted characters are synced to the display</label></div>
                                <div className='textarea-braille'>{brailleDots.split(" ").map((word, index) => (<BrailleLetter key={index} dots={word} />))}</div>
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
    );
}

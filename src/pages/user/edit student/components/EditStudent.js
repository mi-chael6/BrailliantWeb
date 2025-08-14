import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";

import './EditStudent.css'
import SideNavigation from '../../../../global/components/user/SideNavigation';
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import axios from 'axios';

export default function EditStudent() {

    const navigate = useNavigate()

    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])
    const [student, setStudent] = useState([])

    const location = useLocation();
    const selectedStudent = location.state;

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
        setStudent(selectedStudent)
        console.log(selectedStudent)
    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='ep-container'>
                <div className='ep-header'>
                    <label>Edit Profile</label>
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
                <div className='ep-body'>
                    <div className="profile-page">
                        <main className="profile-container">
                            <h1>Your Profile</h1>
                            <div className="profile-grid">

                                <div className='view-student-detail'>

                                    <div className='vs2'>
                                        <label>Last Name:</label>
                                        <input value={selectedStudent.student_lname} />
                                    </div>
                                    <div className='vs1'>
                                        <div className='vs2'>
                                            <label>First Name:</label>
                                            <input value={selectedStudent.student_fname} />
                                        </div>
                                        <div className='vs2'>
                                            <label>Middle Initial:</label>
                                            <input value={selectedStudent.student_mi} />
                                        </div>
                                    </div>
                                    <div className='vs1'>
                                        <div className='vs2'>
                                            <label>Date of Birth:</label>
                                            <input value={new Date(selectedStudent.student_dob).toLocaleDateString()} />
                                        </div>
                                        <div className='vs2'>
                                            <label>Gender:</label>
                                            <input value={selectedStudent.student_gender} />
                                        </div>
                                    </div>
                                    <div className='vs-buttons'>
                                        <button className='vs-edit'>Edit Details <img src={require('../assets/edit.png')} /></button>
                                        <button className='vs-remove' >Remove <img src={require('../assets/remove.png')} /></button>
                                    </div>
                                </div>

                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

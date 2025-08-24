import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom";
import './Profile.css'
import './SignInModal.css'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import SideNavigation from '../../../../global/components/user/SideNavigation'
import Header from '../../../../global/components/user/Header';

export default function Profile() {
    const page = "Profile"
    const searchBar = false

    const navigate = useNavigate()

    const [modal, setModal] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))

    }, [])


    const toggleModal = () => {
        setModal(!modal)
    }
    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }


    return (
        <div className='container'>
            {modal && (
                <div className='modal'>
                    <div className='otp-overlay' onClick={toggleModal} ></div>
                    <div className='otp-modal-content'>
                        <div className='otp-loginmodal'>
                            <button className='close-modal' onClick={toggleModal}>x </button>
                            <label className='otp-head'>Verification Successful</label>
                            <label className='otp-text'>Explore more of Brailliant features for activated users!</label>
                            <img src={require('../assets/check.png')} />

                            <button className='otp-login-modal' onClick={toggleModal}>Proceed</button>
                        </div>
                    </div>
                </div>
            )}
            <div>
                <SideNavigation />
            </div>

            <div className='profile-containers'>
                <div className='profile-header'>
                    <Header page={page} searchBar={searchBar} />
                </div>
                {showDropdown && <DropDownMenu />}
                <div className='profile-body'>
                    <div className='profile-image'>


                        <img
                            className='profile-img'
                            src={
                                users.user_img
                                    ? users.user_img
                                    : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                            }
                        />
                        {/** 
                        <label for="image-upload" className='profile-upload'>
                            <img src={require('../assets/upload.png')} />Upload Picture
                        </label>

                        <input
                            id='image-upload'
                            type='file'
                            accept='image/*'
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                setSelectedImage(
                                    file ? URL.createObjectURL(file) : undefined
                                )
                            }}
                            required
                        />

*/}

                    </div>
                    <div className='profile-info-section'>
                        <div className='profile-my-profile'>
                            <label>My Profile</label>
                            <button onClick={() => { navigate('/edit/profile') }}>Edit<img src={require('../assets/edit.png')} /></button>
                        </div>
                        <div className='profile-info'>
                            <div className='profile-1'>
                                <label>Personal Information</label>
                            </div>
                            <div className='profile-2'>
                                <label>First Name: {users.user_fname}</label>
                                <label>Last Name: {users.user_lname}</label>
                            </div>
                            <div className='profile-3'>
                                <label>DOB: {users.user_dob}</label>
                                <label>Email: {users.user_email}</label>
                            </div>
                        </div>
                        <div className='profile-activate'>
                            <label>Account Status: {users.user_status ? users.user_status : "Not Activated"}</label>
                            <button onClick={() => users.user_status ? toggleModal() : navigate('/account-activation')}>Activate Account<img src={require('../assets/edit.png')} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

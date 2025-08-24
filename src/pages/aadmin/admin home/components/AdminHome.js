import React, { useState, useEffect } from 'react';
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import './AdminHome.css'
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';



export default function AdminHome() {

    const navigate = new useNavigate()

    const admin = JSON.parse(localStorage.getItem('admin'));
    if (!admin) {
        navigate(-1)
    }


    const [bookCount, setBookCount] = useState(0)
    const [allUsers, setAllUsers] = useState(0)
    const [activatedUsers, setActivatedUsers] = useState(0);


    useEffect(() => {


        axios.get('https://brailliantweb.onrender.com/api/books/count')
            .then((response) => {
                setBookCount(response.data.count);
            })
            .catch((error) => {
                console.error('Error fetching student count:', error);
            });



    }, [])

    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allusers')
            .then((response) => {
                console.log(response.data)
                setAllUsers(response.data);
                const activated = response.data.users?.filter(user => user.user_status === "Activated").length || 0;
                setActivatedUsers(activated);
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            });
    }, []);

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-home-container'>
                <div className='admin-home-header'>
                    <AdminHeader page={"Dashboard"} />
                </div>
                <div className='admin-home-body'>
                    <div className='admin-home'>
                        <div className='admin-home-summary'>
                            <div className='admin-summary'>
                                <label>Summary</label>
                            </div>
                            <div className='admin-home-info'>
                                <div className='admin-home-active'>
                                    <div className='ah-users'>
                                        <label>Active User Accounts</label>
                                    </div>
                                    <div className='ah-div'>
                                        <label className='ah-count'>{activatedUsers}</label>
                                        <img src={require('../assets/users.png')} />
                                    </div>
                                </div>
                                <div className='admin-home-approved'>
                                    <div >
                                        <label>Approved Books</label>
                                    </div>
                                    <div className='ah-div'>
                                        <label className='ah-count'>{bookCount}</label>
                                        <img src={require('../assets/books.png')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='admin-home-navigation'>
                            <div className='admin-ml' onClick={() => { navigate('/admin/library') }}>
                                <img className='ml-book' src={require('../assets/library.png')} />
                                <label>Manage Library</label>
                            </div>
                            <div className='admin-ma' onClick={() => { navigate('/admin/accounts') }}>
                                <img src={require('../assets/acc.png')} />
                                <label>Manage Accounts</label>
                            </div>
                            <div className='admin-cr' onClick={() => { navigate('/admin/content-request') }}>
                                <img src={require('../assets/content.png')} />
                                <label>Content Request</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

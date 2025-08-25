import React, { useState, useEffect } from 'react';
import './DropDownMenu.css'
import { Link, useNavigate } from "react-router-dom";


export default function DropDownMenu({toggleDropdown}) {

    const navigate = new useNavigate()

    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const logout = () => {
        localStorage.removeItem('users')
        navigate('/')
    }

    return (
        <div className='dd-overlay' onClick={toggleDropdown}>
            <div className='sub-menu-wrap'>
                <div className='sub-menu'>
                    <div className='user-info'>
                        <label>{users.user_fname}</label>
                    </div>
                    <hr />
                    <a className='sub-menu-link'>
                        <p onClick={() => { navigate('/profile') }}>Profile</p>
                    </a>
                    <a className='sub-menu-link'>
                        <p onClick={() => { navigate('/device-settings') }}>Device Settings</p>
                    </a>
                    <a className='sub-menu-link'>
                        <p onClick={logout}>Logout</p>
                    </a>
                </div>
            </div>
        </div>

    )
}

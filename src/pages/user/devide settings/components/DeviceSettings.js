import React, { useState, useEffect } from 'react';
import './DeviceSettings.css'
import './DeviceSettingsHeader.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';



export default function DeviceSettings() {
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([])

    useEffect(() => {
        setUsers(JSON.parse(localStorage.getItem('users')))
    }, [])

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };
    return (
        <div className='container'>
            <div>
                <SideNavigation />
            </div>
            <div className='ds-container'>
                <div className='ds-header'>
                    <label>Device Settings</label>
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
                <div className='ds-body'>
                    <div className='ds-settings'>
                        <div className='ds-1'>
                            <label>Device Settings</label>
                            <button>Disconnect</button>
                        </div>
                        <div className='ds-2'>
                            <img className='rbd' src={require('../assets/RBD 1.png')} />
                            <div className='ds-info'>
                                <label>Device Information</label>
                                <label>Name: RBD2025</label>
                                <label>Paired</label>
                                <label>Battery: 97%</label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

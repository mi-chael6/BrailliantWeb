import React, { useState, useEffect } from 'react';
import './DeviceSettings.css'
import SideNavigation from '../../../../global/components/user/SideNavigation'
import DropDownMenu from '../../../../global/components/user/DropDownMenu';
import Header from '../../../../global/components/user/Header';


export default function DeviceSettings() {
    const page = "Device Settings"
    const searchBar = false

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
                    <Header page={page} searchBar={searchBar} />
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
                                <label>---------------------------</label>
                                <label>Battery: 97%</label>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

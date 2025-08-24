import React, { useState, useEffect } from 'react';
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import './ManageAccounts.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



export default function ManageAccounts() {

    const navigate = new useNavigate()

    const [allUsers, setAllUsers] = useState([])
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);
    const activatedCount = allUsers.users?.filter(user => user.user_status === "Activated").length || 0;

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('https://brailliantweb.onrender.com/api/allusers')
            .then((response) => {
                console.log(response.data)
                setAllUsers(response.data)
            })
            .catch((error) => {
                console.log("eto ang error mo " + error)
            })
    }, [])


    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-ma-container'>
                <div className='admin-ma-header'>
                    <AdminHeader page={"Manage Accounts"} />
                </div>
                <div className='admin-ma-body'>
                    <div className='admin-manage-accounts'>
                        <div className='admin-ma-accounts'>
                            <label className='all-acc'>All Accounts</label>
                            <div className='admin-ma-active'>
                                <img src={require('../assets/user.png')} />
                                <div className='ma-text'>
                                    <label className='ma-count'>{activatedCount}</label>
                                    <label className='ma-active'>Active Accounts</label>
                                </div>

                            </div>
                        </div>
                        <div className='admin-accounts'>
                            <div className='admin-accounts-actions'>
                                <input
                                    placeholder='Search accounts'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                                />
                                <div className='admin-accounts-buttons'>
                                    <button onClick={() => { navigate('/admin/create-account') }}>Create Account <img className='add-img' src={require('../assets/add.png')} /></button>
                                    <button onClick={() => {
                                        if (!selectedRowId) {
                                            alert("Please select a user.");
                                            return;
                                        }
                                        navigate('/admin/edit-account', { state: { user: selectedUser } })

                                    }}>Edit Details <img src={require('../assets/edit.png')} /></button>
                                    {/*<button>Remove <img src={require('../assets/delete.png')} /></button>*/}
                                </div>
                            </div>
                            <div className='ma-table'>
                                <table className='admin-ma-table'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Last Name</th>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Birthdate</th>
                                        {/*<th>Age</th>*/}
                                        <th>Last In</th>
                                        <th>Recent Activity</th>
                                        <th>User Status</th>
                                    </tr>
                                    {allUsers.users
                                        ?.filter((user) =>
                                            user.user_fname?.toLowerCase().includes(searchQuery) ||
                                            user.user_lname?.toLowerCase().includes(searchQuery) ||
                                            user.user_email?.toLowerCase().includes(searchQuery)
                                        )
                                        .map((user) => (
                                            <tr
                                                key={user._id}
                                                onClick={() => {
                                                    setSelectedRowId(user._id);
                                                    setSelectedUser(user);
                                                }}
                                                className={selectedRowId === user._id ? "highlighted" : ""}
                                            >
                                                <td>{user._id}</td>
                                                <td>{user.user_lname}</td>
                                                <td>{user.user_fname}</td>
                                                <td>{user.user_email}</td>
                                                <td>{user.user_dob}</td>
                                                <td>{new Date(user.user_last_in).toLocaleString()}</td>
                                                <td>{user?.user_recent_act?.trim() ? user.user_recent_act : "N/A"}</td>
                                                <td>{user?.user_status?.trim() ? user.user_status : "Not Activated"}</td>
                                            </tr>
                                        ))}


                                </table>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

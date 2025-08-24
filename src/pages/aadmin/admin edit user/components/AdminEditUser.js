import React, { useState, useEffect } from 'react';
import './AdminEditUser.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


export default function AdminEditUser() {

    const location = useLocation();
    const selectedUser = location.state.user;

    const navigate = new useNavigate()
    console.log(selectedUser, 'eto yung id')

    const validateForm = () => {
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errors = [];

        if (!nameRegex.test(editUser.user_fname)) {
            errors.push("First name must contain only letters.");
        }

        if (!nameRegex.test(editUser.user_lname)) {
            errors.push("Last name must contain only letters.");
        }

        if (!emailRegex.test(editUser.user_email)) {
            errors.push("Enter a valid email address.");
        }

        if (!editUser.user_dob || new Date(editUser.user_dob) >= new Date()) {
            errors.push("Date of birth must be a past date.");
        }
/**
        if (editUser.user_password.length < 6) {
            errors.push("Password must be at least 6 characters.");
        }

        if (editUser.user_password !== cpassword) {
            errors.push("Passwords do not match.");
        }
 */
        return errors;
    };

    //////////////////

    const [users, setUsers] = useState([])
    const [editUser, setEditUser] = useState({
        user_fname: '',
        user_lname: '',
        user_email: '',
        user_dob: '',
        user_password: '',
    });
    const [cpassword, setCpassword] = useState('')


    useEffect(() => {
        if (selectedUser) {
            setUsers(selectedUser);
            setEditUser(selectedUser);
        }
    }, []);

    const confirmPassword = () => {
        const errors = validateForm();

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        handleUpdateUser(editUser._id);
        alert("Update Successful!");
        navigate('/admin/accounts');
    };

    const handleUpdateUser = (id) => {

        axios.put(`https://brailliantweb.onrender.com/api/update/user/${id}`, editUser)
            .then(() => {
                console.log(editUser, "this after update");
                setEditUser({ ...editUser, user_password: '' });
                setCpassword('');
                setUsers(editUser);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //////////////////


    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-ed-container'>
                <div className='admin-ed-header'>
                    <AdminHeader page={"Edit User"} />
                </div>
                <div className='admin-ed-body'>
                    <div className='admin-edit-account'>

                        <div className="profile-page">
                            <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>

                            <main className="profile-container">

                                <div className="profile-grid">

                                    <table className="profile-table">

                                        <tr>
                                            <td><strong>Last Name:</strong></td>
                                            <td>{users.user_lname?.charAt(0).toUpperCase() + users.user_lname?.slice(1)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>First Name:</strong></td>
                                            <td>{users.user_fname?.charAt(0).toUpperCase() + users.user_fname?.slice(1)}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Date of Birth:</strong></td>
                                            <td>{users.user_dob}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email:</strong></td>
                                            <td>{users.user_email}</td>
                                        </tr>


                                    </table>
                                    <div className='form-container' >

                                        <div className="profile-form">
                                            <div className='form-row1' >
                                                <p>First Name</p>
                                                <p>Last Name</p>
                                            </div>
                                            <div className="form-row2">
                                                <input
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={editUser.user_fname}
                                                    onChange={(e) => setEditUser({ ...editUser, user_fname: e.target.value })}

                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={editUser.user_lname}
                                                    onChange={(e) => setEditUser({ ...editUser, user_lname: e.target.value })}
                                                />
                                            </div>
                                            <p>Email</p>
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={editUser.user_email}
                                                onChange={(e) => setEditUser({ ...editUser, user_email: e.target.value })}
                                            />
                                            <p>Date of Birth</p>
                                            <input
                                                type="date"
                                                placeholder="Date of Birth"
                                                value={editUser.user_dob}
                                                onChange={(e) => setEditUser({ ...editUser, user_dob: e.target.value })}
                                            />
                                            {/**                                           
                                            <p>Password</p>
                                            <input
                                                type="password"
                                                placeholder="Enter new password"
                                                value={editUser.user_password}
                                                onChange={(e) => setEditUser({ ...editUser, user_password: e.target.value })}
                                            />

                                            <p>Confirm Password</p>
                                            <input
                                                type="password"
                                                placeholder="Re-enter new password"
                                                value={cpassword}
                                                onChange={(e) => setCpassword(e.target.value)}
                                            />

 */}
                                            <div className="form-actions">
                                                <button onClick={confirmPassword} className="editsave-btn">Save</button>
                                                <button onClick={() => { navigate('/admin/accounts') }} type="button" className="cancel-btn">Back</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </main>
                        </div>



                    </div>
                </div>
            </div>
        </div>
    )
}

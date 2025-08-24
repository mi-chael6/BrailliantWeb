import React, { useState, useEffect } from 'react';
import './AdminCreateAccountTempt.css'
import AdminSideNavigation from '../../../../global/components/admin/AdminSideNavigation'
import AdminHeader from '../../../../global/components/admin/AdminHeader'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


export default function AdminCreateAccountTempt() {


    const navigate = new useNavigate()


    ////////////

    const [newUser, setNewUser] = useState({
        user_fname: '',
        user_lname: '',
        user_email: '',
        user_password: '',
        user_cpassword: '',
        user_dob: '',
    });

    /*
    const createUser = (req, res) => {
        const newUser = new UserModel(req.body)
        newUser.save()
            .then(user => res.json(user))
            .catch(err => {
                console.error(err)
                res.status(500).json({ error: 'Internal Server Error' })
            })
    }
    */

    const confirmPassword = (e) => {
        e.preventDefault();
        if (validateForm()) {
            handleCreateUser();
        }
    };
    const clearForm = () => {
        setNewUser({
            user_fname: '',
            user_lname: '',
            user_email: '',
            user_password: '',
            user_cpassword: '',
            user_dob: '',
        });
    };

    const handleCreateUser = async () => {

        try {
            const response = await axios.post('https://brailliantweb.onrender.com/send-email', {
                subject: "Hello from React!",
                text: "This is a plain text email.",
                html: "<h3>Email:</h3>" + newUser.user_email + "<br/> <h3>Password:</h3>" + newUser.user_password,
                email: newUser.user_email
            });
            alert("Email sent!");
        } catch (err) {
            console.error("Failed to send email", err);
            alert("Failed to send email");
        }

        axios.post('https://brailliantweb.onrender.com/api/newuser', newUser)
            .then(() => {
                alert("User created successfully!");
                clearForm();
                navigate('/admin/accounts')
            })
            .catch((error) => {
                console.log(error);
            });
    };

    ////////////

    const validateForm = () => {
        const { user_fname, user_lname, user_email, user_password, user_cpassword, user_dob } = newUser;

        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nameRegex.test(user_fname)) {
            alert("First name must contain only letters.");
            return false;
        }

        if (!nameRegex.test(user_lname)) {
            alert("Last name must contain only letters.");
            return false;
        }

        if (!emailRegex.test(user_email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (user_password.length < 6) {
            alert("Password must be at least 6 characters.");
            return false;
        }

        if (user_password !== user_cpassword) {
            alert("Passwords do not match.");
            return false;
        }

        const dob = new Date(user_dob);
        const today = new Date();
        if (dob >= today) {
            alert("Date of birth must be in the past.");
            return false;
        }

        return true;
    };

    return (
        <div className='container'>
            <div>
                <AdminSideNavigation />
            </div>
            <div className='admin-cs-container'>
                <div className='admin-cs-header'>
                    <AdminHeader page={"Create Account"} />
                </div>
                <div className='admin-cs-body'>

                    <div className='admin-create-account'>
                        <button className='back-btn' onClick={() => { navigate(-1) }}><img src={require('../../../../global/asset/back.png')} /></button>

                        <div className='admin-create'>


                            <div >

                                <div className='create-form-container' >

                                    <form className="create-form" onSubmit={confirmPassword}>
                                        <div className='row1-cont'>

                                            <div className='create-form-row1' >
                                                <p>First Name</p>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={newUser.user_fname}
                                                    onChange={(e) => setNewUser({ ...newUser, user_fname: e.target.value })}
                                                />

                                            </div>
                                            <div className="create-form-row2">
                                                <p>Last Name</p>
                                                <input
                                                    required
                                                    type="text"
                                                    name="lname"
                                                    placeholder="Last Name"
                                                    value={newUser.user_lname}
                                                    onChange={(e) => setNewUser({ ...newUser, user_lname: e.target.value })}
                                                />
                                            </div>
                                        </div>

                                        <p>Email</p>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={newUser.user_email}
                                            onChange={(e) => setNewUser({ ...newUser, user_email: e.target.value })}
                                        />



                                        <p>Date of Birth</p>
                                        <input
                                            required
                                            type="date"
                                            name="dob"
                                            placeholder="Date of Birth"
                                            value={newUser.user_dob}
                                            onChange={(e) => setNewUser({ ...newUser, user_dob: e.target.value })}
                                        />

                                        <p>Password</p>
                                        <input
                                            required
                                            type="password"
                                            name="password"
                                            placeholder="Enter new password"
                                            value={newUser.user_password}
                                            onChange={(e) => setNewUser({ ...newUser, user_password: e.target.value })}
                                        />
                                        <p>Confirm Password</p>
                                        <input
                                            required
                                            type="password"
                                            name="cpassword"
                                            placeholder="Enter new password"
                                            value={newUser.user_cpassword}
                                            onChange={(e) => setNewUser({ ...newUser, user_cpassword: e.target.value })}
                                        />
                                        <button className='sync'>Create Account</button>

                                    </form>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

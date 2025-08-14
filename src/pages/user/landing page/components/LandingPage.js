import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

import './LandingPage.css'
import './OTPModal.css'
import './SuccessfulModal.css'
import './EmailModal.css'
import './ForgotPasswordModal.css'
import './PasswordModal.css'
import './SignInModal.css'

import SlidesData from './slides/SlidesData'


export default function LandingPage() {
    const navigate = useNavigate()

    const [modal, setModal] = useState(false)
    const [OTPModal, setOTPModal] = useState(false)
    const [loginSuccessfulModal, setLoginSuccessfulModal] = useState(false)

    const [emailModal, setEmailModal] = useState(false)
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    const [otp, setOtp] = useState('');
    const [inputOtp, setInputOtp] = useState('');

    //switch login forgot pass

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === SlidesData.length - 1 ? 0 : prevIndex + 1
            );
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const confirmOTP = () => {
        console.log('pasok')
        const newOtp = generateOTP();
        setOtp(newOtp);
        sendEmail(newOtp);
    };

    const generateOTP = () => {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    };

    const sendEmail = async (generatedOtp) => {
        try {
            const response = await axios.post('https://brailliantweb.onrender.com/send-email', {
                subject: "Hello from React!",
                text: "This is a plain text email.",
                html: "<h3>This is your login OTP</h3>" + generatedOtp,
                email: email
            });
            alert("Email sent!");
        } catch (err) {
            console.error("Failed to send email", err);
            alert("Failed to send email");
        }
    };
    const sendEmailForgotpassword = async (generatedOtp) => {
        try {
            const response = await axios.post('https://brailliantweb.onrender.com/send-email', {
                subject: "Hello from React!",
                text: "This is a plain text email.",
                html: "<h3>This is your OTP for password renewal </h3>" + generatedOtp,
                email: email
            });
            alert("Email sent!");
        } catch (err) {
            console.error("Failed to send email", err);
            alert("Failed to send email");
        }
    };

    const verifyEmail = async () => {
        setPassword('')
        try {
            const response = await axios.post("https://brailliantweb.onrender.com/api/verify-email", {
                email,
            });
            if (response) {
                toggleEmailModal()
                toggleForgotPassModal()

                const newOtp = generateOTP();
                setOtp(newOtp);
                sendEmailForgotpassword(newOtp);
            }
        } catch (error) {
            alert("Invalid email. Please try again.");
            clearForm();
        }
    };

    const handleEmailVerify = () => {
        if (inputOtp === otp) {
            toggleForgotPassModal()
            togglePasswordModal()

        }
        else {
            alert("Invalid OTP.");
        }
    };


    const handlePasswordSuccess = async () => {
        if (password === confirmPassword) {
            try {
                const response = await axios.put("https://brailliantweb.onrender.com/api/update-password", {
                    password, email
                });
                alert("Password renew successfull!.");
                clearForm()
                togglePasswordModal()

            } catch (error) {
                console.log(error)
                alert("Something went wrong in updating.");
            }

        }
        else {
            alert("Password does not match.");
        }
    };

    const handleVerify = async () => {
        if (inputOtp === otp) {
            try {
                await axios.post("https://brailliantweb.onrender.com/api/otp-verified", { email });
                toggleOTPModal();
                toggleSuccessfulModal();
            } catch (err) {
                alert("Failed to mark OTP verified.");
            }
        } else {
            alert("Invalid OTP.");
        }
    };


    const handleLogin = async () => {
        try {
            const response = await axios.post("https://brailliantweb.onrender.com/api/handle-credentials", {
                email,
                password
            })
            console.log(response)
            const { requiresOtp } = response.data;

            if (requiresOtp) {
                toggleModal();
                toggleOTPModal();

                const newOtp = generateOTP();
                setOtp(newOtp);
                sendEmail(newOtp);
            } else {
                toggleSuccessfulModal() // skip OTP
            }

        } catch (error) {
            alert("Invalid email or password. Please try again.");
            clearForm();
        }
    };
    const handleSuccess = async () => {
        try {
            const response = await axios.post("https://brailliantweb.onrender.com/api/login", {
                email,
                password
            });

            const { user, role, token } = response.data;

            // Save token to localStorage
            localStorage.setItem("token", token);

            if (role === "admin") {
                localStorage.setItem("admin", JSON.stringify(user));
                axios.put(`https://brailliantweb.onrender.com/api/update/admin/${user._id}`, {
                    admin_last_in: new Date()
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                navigate('/admin/home')
            } else {
                localStorage.setItem("users", JSON.stringify(user));
                axios.put(`https://brailliantweb.onrender.com/api/update/user/${user._id}`, {
                    user_last_in: new Date()
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                navigate('/home')
            }

        } catch (error) {
            alert("Invalid email or password. Please try again.");
            clearForm();
        }
    };


    const nextSlide = () => {
        if (currentIndex < SlidesData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        if (currentIndex == 3) {
            toggleModal()
        }
    };

    const clearForm = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setInputOtp('')
    };

    const moveDot = (index) => {
        setCurrentIndex(index)
    }

    const toggleModal = () => {
        setModal(!modal)
    }
    const toggleOTPModal = () => {
        setOTPModal(!OTPModal)
    }
    const toggleSuccessfulModal = () => {
        setLoginSuccessfulModal(!loginSuccessfulModal)
    }

    const toggleEmailModal = () => {
        setEmailModal(!emailModal)
    }
    const toggleForgotPassModal = () => {
        setForgotPasswordModal(!forgotPasswordModal)
    }
    const togglePasswordModal = () => {
        setPasswordModal(!passwordModal)
    }



    if (modal) {
        document.body.classList.add('active-modal')
    }
    else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='landing-page-container' >
            {modal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleModal} ></div>
                    <div className='modal-content'>
                        <div className='loginmodal'>
                            <button className='close-modal' onClick={toggleModal}>x</button>
                            <h2>Sign In</h2>
                            <br />

                            <p>Email</p>
                            <input
                                placeholder='Enter email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <p>Password</p>
                            <input
                                className="pass-input"
                                placeholder='Enter password'
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a onClick={() => {
                                toggleModal()
                                toggleEmailModal()

                            }} className="forgot-pass">Forgot password?</a>
                            <button className='login-modal' onClick={handleLogin} >Login</button>
                        </div>
                    </div>
                </div>
            )}
            {OTPModal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleOTPModal} ></div>
                    <div className='otpl-modal-content'>
                        <div className='otpl-loginmodal'>
                            <button className='close-modal' onClick={toggleOTPModal}>x </button>
                            <label className='otpl-head'>We just sent an Email</label>
                            <label className='otpl-text'>Enter the One-Time-Pin (OTP) we have sent in your email.</label>
                            <input
                                placeholder='Enter OTP'
                                value={inputOtp}
                                onChange={(e) => setInputOtp(e.target.value)}
                            />
                            <button className='otpl-login-modal' onClick={handleVerify}>Verify</button>
                        </div>
                    </div>
                </div>
            )}
            {loginSuccessfulModal && (
                <div className='modal'>
                    <div className='overlay' onClick={handleSuccess} ></div>
                    <div className='s-modal-content'>
                        <div className='s-loginmodal'>
                            <label className='s-head'>Login Successful</label>
                            <img src={require('../assets/check.png')} />

                            <button className='s-login-modal' onClick={handleSuccess}>Proceed</button>
                        </div>
                    </div>
                </div>
            )}

            {emailModal && (
                <div className='modal'>
                    <div className='overlay' onClick={toggleEmailModal} ></div>
                    <div className='e-modal-content'>
                        <div className='e-loginmodal'>
                            <button className='close-modal' onClick={toggleEmailModal}>x </button>
                            <label className='e-head'>Enter Email</label>
                            <input
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className='e-login-modal' onClick={verifyEmail}>Enter</button>
                        </div>
                    </div>
                </div>
            )}
            {forgotPasswordModal && (
                <div className='modal'>
                    <div className='overlay'></div>
                    <div className='fp-modal-content'>
                        <div className='fp-loginmodal'>
                            <button className='close-modal' onClick={toggleForgotPassModal}>x </button>
                            <label className='fp-head'>We just sent an Email</label>
                            <label className='fp-text'>Enter the One-Time-Pin (OTP) we have sent in your email.</label>
                            <input
                                placeholder='Enter OTP'
                                value={inputOtp}
                                onChange={(e) => setInputOtp(e.target.value)}
                            />

                            <button className='fp-login-modal' onClick={handleEmailVerify}>Verify</button>
                        </div>
                    </div>
                </div>
            )}
            {passwordModal && (
                <div className='modal'>
                    <div className='overlay'></div>
                    <div className='p-modal-content'>
                        <div className='p-loginmodal'>
                            <button className='close-modal' onClick={togglePasswordModal}>x </button>
                            <label className='p-text'>New Password</label>
                            <input
                                placeholder='Enter new password'
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className='p-text'>Confirm Password</label>

                            <input
                                placeholder='Confirm password'
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <button className='p-login-modal' onClick={handlePasswordSuccess}>Verify</button>
                        </div>
                    </div>
                </div>
            )}


            <div className='landing-page-header'>
                <img className='landing-page-logo' src={require('../../../../global/asset/Brailliant-Logo.png')} /><br />
                <nav>
                    <button className='sign-in-btn' onClick={toggleModal} >SIGN IN</button>
                </nav>
            </div>

            <div className='landing-page-body'>
                <div className="landing-page-hero-slider">
                    <div
                        className="slide-wrapper"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {SlidesData.map((slide, idx) => (
                            <div key={idx} className="landing-page-hero">
                                <img src={slide.image} alt={`Slide ${idx + 1}`} />
                                <label>{slide.title}</label>
                                <p>{slide.description}</p>
                                <div className="container-dots">
                                    {Array.from({ length: 4 }).map((item, index) => (
                                        <div
                                            className={currentIndex === index ? "dot-active" : "dot"}
                                            onClick={() => { moveDot(index) }}
                                        >
                                        </div>
                                    ))}
                                </div>
                                <button onClick={nextSlide}>{slide.button}</button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>




        </div>

    )
}

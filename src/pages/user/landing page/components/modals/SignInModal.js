import React from 'react';
import './SignInModal.css'

export default function SignInModal({ email, password, onEmailChange, onPasswordChange, onLogin, onClose, onForgot }) {
    return (
        <div className='modal'>
            <div className='overlay' onClick={onClose}></div>
            <div className='modal-content'>
                <div className='loginmodal'>
                    <button className='close-modal' onClick={onClose}>x</button>
                    <h2>Sign In</h2>
                    <p>Email</p>
                    <input
                        placeholder='Enter email'
                        type='email'
                        value={email}
                        onChange={onEmailChange}
                    />
                    <p>Password</p>
                    <input
                        className="pass-input"
                        placeholder='Enter password'
                        type='password'
                        value={password}
                        onChange={onPasswordChange}
                    />
                    <a onClick={onForgot} className="forgot-pass">Forgot password?</a>
                    <button className='login-modal' onClick={onLogin}>Login</button>
                </div>
            </div>
        </div>
    );
}

import React from 'react';
import './OTPModal.css'

export default function OTPModal({ inputOtp, onOtpChange, onVerify, onClose }) {
    return (
        <div className='modal'>
            <div className='overlay' onClick={onClose}></div>
            <div className='otpl-modal-content'>
                <div className='otpl-loginmodal'>
                    <button className='close-modal' onClick={onClose}>x</button>
                    <label className='otpl-head'>We just sent an Email</label>
                    <label className='otpl-text'>Enter the One-Time-Pin (OTP) we have sent in your email.</label>
                    <input placeholder='Enter OTP' value={inputOtp} onChange={onOtpChange} />
                    <button className='otpl-login-modal' onClick={onVerify}>Verify</button>
                </div>
            </div>
        </div>
    );
}
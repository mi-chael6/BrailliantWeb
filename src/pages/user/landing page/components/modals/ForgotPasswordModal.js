import React from 'react';
import './ForgotPasswordModal.css'

export default function ForgotPasswordModal({ inputOtp, onOtpChange, onVerify, onClose }) {
    return (
        <div className='modal'>
            <div className='overlay'></div>
            <div className='fp-modal-content'>
                <div className='fp-loginmodal'>
                    <button className='close-modal' onClick={onClose}>x</button>
                    <label className='fp-head'>We just sent an Email</label>
                    <label className='fp-text'>Enter the One-Time-Pin (OTP) we have sent in your email.</label>
                    <input placeholder='Enter OTP' value={inputOtp} onChange={onOtpChange} />
                    <button className='fp-login-modal' onClick={onVerify}>Verify</button>
                </div>
            </div>
        </div>
    );
}
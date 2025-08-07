import React from 'react';
import './EmailModal.css'
export default function EmailModal({ email, onEmailChange, onSubmit, onClose }) {
    return (
        <div className='modal'>
            <div className='overlay' onClick={onClose}></div>
            <div className='e-modal-content'>
                <div className='e-loginmodal'>
                    <button className='close-modal' onClick={onClose}>x</button>
                    <label className='e-head'>Enter Email</label>
                    <input placeholder='Enter Email' value={email} onChange={onEmailChange} />
                    <button className='e-login-modal' onClick={onSubmit}>Enter</button>
                </div>
            </div>
        </div>
    );
}
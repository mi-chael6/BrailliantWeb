import React from 'react';
import './PasswordModal.css'

export default function PasswordModal({ password, confirmPassword, onPasswordChange, onConfirmPasswordChange, onSubmit, onClose }) {
    return (
        <div className='modal'>
            <div className='overlay'></div>
            <div className='p-modal-content'>
                <div className='p-loginmodal'>
                    <button className='close-modal' onClick={onClose}>x</button>
                    <label className='p-text'>New Password</label>
                    <input type='password' placeholder='Enter new password' value={password} onChange={onPasswordChange} />
                    <label className='p-text'>Confirm Password</label>
                    <input type='password' placeholder='Confirm password' value={confirmPassword} onChange={onConfirmPasswordChange} />
                    <button className='p-login-modal' onClick={onSubmit}>Verify</button>
                </div>
            </div>
        </div>
    );
}

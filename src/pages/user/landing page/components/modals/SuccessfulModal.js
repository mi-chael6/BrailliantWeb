import React from 'react';
import './SuccessfulModal.css'

export default function SuccessfulModal({ onConfirm }) {
    return (
        <div className='modal'>
            <div className='overlay' onClick={onConfirm}></div>
            <div className='s-modal-content'>
                <div className='s-loginmodal'>
                    <label className='s-head'>Login Successful</label>
                    <img src={require('../../assets/check.png')} alt='check' />
                    <button className='s-login-modal' onClick={onConfirm}>Proceed</button>
                </div>
            </div>
        </div>
    );
}
import React from 'react'
import './SideNavigation.css'

export default function SideNavigation() {
  const user = JSON.parse(localStorage.getItem('users'))

  return (
    <div className='sidenav-container'>
      <img className='sidenav-logo' src={require('../../asset/Brailliant-Logo.png')} /><br />
      <label>MENU</label>
      <a href='/home'><img src={require('../../asset/Home.png')} /> Home</a>

      {user?.isActivated ? (
        <a href='/library'><img src={require('../../asset/off.png')} /> Library</a>
      ) : (
        <span className="disabled-link"><img src={require('../../asset/off.png')} /> Library</span>
      )}

      <a href='/class'><img src={require('../../asset/Users.png')} /> Class Settings</a>
      <a href='/text-to-braille'><img src={require('../../asset/Type.png')} /> Text-to-Braille</a>

      {user?.isActivated ? (
        <a href='/analytics'><img src={require('../../asset/Bar chart-2.png')} /> Analytics</a>
      ) : (
        <span className="disabled-link"><img src={require('../../asset/Bar chart-2.png')} /> Analytics</span>
      )}

      <hr />
      <a href='/profile'><img src={require('../../asset/User.png')} /> Profile</a>
      <hr />
      <label>Device: --</label>
      <a href='/device-settings'><img src={require('../../asset/Settings.png')} /> Device Settings</a>
    </div>
  )
}

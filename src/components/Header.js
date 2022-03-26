import React from 'react';
import './styles/Header.css';

export default function Header() {
    return (
        <div className="Header">
            <div className="Header-in">
                <img src='/images/CAU_Logo.png' alt="logo" />
                <div className="Headertext">
                    <p>Central Agricultural</p>
                    <p id='header-uni'>University</p>
                </div>
            </div>
            <div className="Header-in Header-profile">
                <img src='/images/profile.png' alt="profile-icon" />
            </div>
        </div>
    )

}
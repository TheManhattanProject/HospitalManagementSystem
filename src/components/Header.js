import React from 'react';
import './styles/Header.css';

export default function Header() {
    return (
        <div className="Header">

            <img src='/images/CAU_Logo.png' alt="logo" />
            <div className="Headertext">
                <p>Central Agricultural</p>
                <p id='header-uni'>University</p>
            </div>

        </div>
    )

}
import React from 'react';
import './styles/Header.css';
import uniLogo from "../assets/CAU_Logo.png";
import profileIcon from "../assets/profile.png"
import Popup from 'reactjs-popup';
import { Navigate } from 'react-router-dom';
import {useState} from 'react';


export default function Header() {

    const [redirect, setRedirect] = useState()
    const [clicked, setClicked] = useState(false)

    function signout(){
        localStorage.removeItem("user");
        localStorage.removeItem("vet");
        localStorage.removeItem("admin");
        setRedirect("/")
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    console.log(clicked)

    return (
        <div className="Header">
            <div className="Header-in">
                <img src={uniLogo} alt="logo" />
                <div className="Headertext">
                    <p>Central Agricultural</p>
                    <p id='header-uni'>University</p>
                </div>
            </div>
            <div className="Header-in Header-profile">
            <Popup  trigger={<div className='profile-div' onClick={() => console.log(!clicked)}>
                <img src={profileIcon} alt="profile-icon" />
                {!clicked && <p className='profile-down-btn'>▼</p>}
            </div>} 
            position={['bottom center']} closeOnDocumentClick>      
            <button className="signout" type="button" onClick={signout}>Sign Out</button>   
            </Popup>
                
            </div>
        </div>
    )

}
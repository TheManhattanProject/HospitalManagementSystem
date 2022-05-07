import React from 'react';
import './styles/Header.css';
import uniLogo from "../assets/CAU_Logo.png";
import logOutIcon from "../assets/Logout.png"
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import {useState} from 'react';


export default function Header() {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false)

    function signout(){
        localStorage.removeItem("user");
        localStorage.removeItem("vet");
        localStorage.removeItem("admin");
        navigate("/")
    }

    

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
            <div className='profile-div' >
                <img className='logOutIconClass' src={logOutIcon}  onClick={signout} alt="profile-icon" />
            </div>
                
            </div>
        </div>
    )

}
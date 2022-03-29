import React from 'react';
import './styles/prevheader.css';
import uniLogo from "../assets/CAU_Logo.png";

export default function PrevHeader() {
    return (
        <div className="Prev-Header">
            <div className="uni-logo">
                <img src={uniLogo} alt="logo" />
                <div className="Headertext">
                    <p>Central Agricultural</p>
                    <p className='close-p'>University</p>   
                </div>
            </div>
            <div className="uni-details Headersubtext">
                <p className="uni-detail">E-mail: cvscaizwal@gmail.com</p>
                <p className="uni-detail close-p">cvsc_purchase@rediffmail.com</p>
                <p className="uni-detail close-p">www.cvsccauaizwal.edu.in</p>
                <p className="uni-detail close-p">Tel: (0389) 2362908, Fax: 2361748</p>
            </div>
        </div>
    )

}
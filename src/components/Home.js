import React from "react";
import './styles/Home.css';
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        if (localStorage.getItem("user") != null) {
          window.location.href = "/dashboard";
        }
        if (localStorage.getItem("vet") != null) {
          window.location.href = "/vet/dashboard";
        }
      }, [])
      
    return (
        <div className="container-out">
            <h1>Home</h1>
            <div className="home">
            <div className="DoctorCard">
              <p> I am a Doctor </p>
                <div className="DoctorCard-image">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Doctor" />
                </div>
                <a href="/vet/login" className="anchor">Continue to Login</a>
                </div>

                <div className="PatientCard">
                <p> I am a Patient </p>
                    <div className="PatientCard-image">
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Patient" />
                    </div>
                    <a  href="/login" className="anchor">Continue to Login</a>
                   
                </div>
                </div>
            </div>
    );





}
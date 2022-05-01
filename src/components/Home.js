import React from "react";
import "./styles/Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PrevHeader from "./PrevHeader";
import patientImg from "../assets/Patient_icon.svg";
import vetImg from "../assets/Doctor_icon.svg";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("vet") != null) {
      navigate("/vet/dashboard");
    }
    if (localStorage.getItem("admin") != null) {
      navigate("/dashboard");
    }
  }, []);


  return (
    <div className="out">
      <PrevHeader />
      <div className="container-out" style={{ backgroundColor: "#002A6A" }}>
        <div className="home">
          <div className="login-card">
            <p> Admin </p>
            <div className="PatientCard-image">
              <img src={patientImg}
                alt="Admin"
              />
            </div>
            <button
              type="button"
              onClick={() => {navigate("/login")}}
            >
              Continue to Login
            </button>
          </div>
            <div className="line">
            <div className="dot"></div>
            <div className="vl"></div>
            <div className="dot"></div>
            </div>

          <div className="login-card">
            <p> I am a Doctor </p>
            <div className="DoctorCard-image">
              <img
                src={vetImg}
                alt="Doctor"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/vet/login")
              }}
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

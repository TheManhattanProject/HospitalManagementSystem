import veternarianStore from "../db/stores/veternarian";
import React from "react";
import {useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import {Navigate} from "react-router-dom";
import PrevHeader from "./PrevHeader";
import './styles/DoctorLogin.css';
import vetIcon from "../assets/Doctor_icon.svg";
const { dialog, BrowserWindow } = window.require('electron').remote


export default function DoctorLogin() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();

  const alertbox = (m) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(window, {
      title: '  Alert',
      buttons: ['Dismiss'],
      type: 'warning',
      message: m,
    });
  }

  useEffect(() => {
    if (localStorage.getItem("vet") != null) {
      // window.location.href = "/vet/dashboard";
      navigate("/vet/dashboard");
    }
  }, [])


    async function logindoctor(event){
      event.preventDefault();
      var result = await veternarianStore.login(email.current.value, password.current.value);
      if (result === "Invalid Password") {
        alertbox(result);
      }
      else if (result === "Invalid Email") {
        alertbox(result);
      }
      else if(!result){
        alertbox("User doesn't exist");
      }
      else {
        localStorage.setItem("vet", result._id);
        localStorage.removeItem("user");
        navigate("/vet/dashboard");
      }
    }
  
    return (
      <div className="out">
      <PrevHeader />
      <div className="container-out" style={{ backgroundColor: "#002A6A" }}>
        <div className="login-page">
          <div className="login-container">
            <div className="signupout">
              <div className="signup">
                <p> New Vet? </p>
                <div className="PatientCard-image">
                  <img src={vetIcon} alt="Doctor" />
                </div>
                <button type="button" onClick={() => navigate("/vet/register")}>
                  Sign Up Here
                </button>
                
              </div>
            </div>

            <div className="formout">
              <div className="form">
                <h2>Login</h2>
                <form className="login-form">
                  <input
                    type="text"
                    placeholder=" Email"
                    ref={email}
                    required
                  />
                  <input
                    type="password"
                    placeholder=" Password"
                    ref={password}
                    required
                  />
                  <div className="buttons">
                  <button onClick={logindoctor}>Proceed</button>
                  <button className="back-btn" type="button" onClick={() => navigate("/")}>
                  Go Back
                </button>
                <button className="admin-btn" type="button" onClick={() => navigate("/admin/login")}>
                  Login as Admin
                </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

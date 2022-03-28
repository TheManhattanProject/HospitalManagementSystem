import veternarianStore from "../db/stores/veternarian";
import React from "react";
import {useState, useEffect, useRef } from "react";
// import { useEffect } from "react";
import {Navigate} from "react-router-dom";
import PrevHeader from "./PrevHeader";
import './styles/DoctorLogin.css';
import vetIcon from "../assets/Doctor_icon.svg";
const { dialog, BrowserWindow } = window.require('electron').remote


export default function DoctorLogin() {
  // const [email, setEmail] = useState();
  const email = useRef();
  // const [password, setPassword] = useState();
  const password = useRef();
  const [redirect, setRedirect] = useState();

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
    if (localStorage.getItem("user") != null) {
      // window.location.href = "/dashboard";
      setRedirect("/dashboard");
    }
    if (localStorage.getItem("vet") != null) {
      // window.location.href = "/vet/dashboard";
      setRedirect("/vet/dashboard");
    }
  }, [])


    async function logindoctor(event){
      event.preventDefault();
      var result = await veternarianStore.login(email.current.value, password.current.value);
      if (result === "Invalid password") {
        alertbox(result);
      }
      else if (result === "Invalid email") {
        alertbox(result);
      }
      else if(!result){
        alertbox("User doesn't exist");
      }
      else {
        console.log(result);
  
        localStorage.setItem("vet", result._id);
        localStorage.removeItem("user");
        // window.location.href = "/vet/dashboard";
        setRedirect("/vet/dashboard");
      }
    }
    if(redirect){
      return <Navigate to={redirect} />
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
                <button type="button" onClick={() => setRedirect("/vet/register")}>
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
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder=" Password"
                    ref={password}
                    required
                    // onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="buttons">
                  <button onClick={logindoctor}>Proceed</button>
                  <button className="back-btn" type="button" onClick={() => setRedirect("/")}>
                  Go Back
                </button>
                <button className="admin-btn" type="button" onClick={() => setRedirect("/admin/login")}>
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

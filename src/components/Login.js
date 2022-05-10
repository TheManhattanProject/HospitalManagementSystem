import adminStore from "../db/stores/admin";
import React from "react";
import { useRef } from "react";
import "./styles/Login.css";
import { useNavigate } from 'react-router-dom';
import PrevHeader from "./PrevHeader";
import patientIcon from "../assets/Patient_icon.svg"
const { dialog, BrowserWindow } = window.require('electron').remote

export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const alertbox = (m) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(window, {
      title: '  Alert',
      buttons: ['Dismiss'],
      type: 'warning',
      message: m,
    });
  }

  async function login(event) {
    event.preventDefault();
    var result = await adminStore.login(email.current.value, password.current.value);
    if (result === "Invalid password") {
      alertbox(result);
    } else if (result === "Invalid email") {
      alertbox(result);
    } else {
      localStorage.setItem("admin", result._id);
      localStorage.removeItem("vet");
      localStorage.removeItem("user");
      navigate("/dashboard");
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
                <p> New Admin? </p>
                <div className="PatientCard-image">
                  <img src={patientIcon} alt="Patient" />
                </div>
                <button type="button" onClick={() => navigate("/register")}>
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
                    ref = {email} 
                    required
                  />
                  <input
                    type="password"
                    placeholder=" Password"
                    ref = {password} 
                    required
                    
                  />
                  <div className="buttons">
                  <button onClick={login}>Proceed</button>
                  <button type="button" className="back-btn" onClick={() => {navigate("/")}}>
                  Go Back
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

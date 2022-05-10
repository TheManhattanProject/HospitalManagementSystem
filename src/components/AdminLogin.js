import veternarianStore from "../db/stores/veternarian";
import React from "react";
import {useState, useRef} from "react";
import { useNavigate } from 'react-router-dom';
import PrevHeader from "./PrevHeader";
import doctorIcon from "../assets/Doctor_icon.svg";
const { dialog, BrowserWindow } = window.require('electron').remote

export default function AdminLogin() {
  const navigate = useNavigate();
  const email = useRef();
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


    async function logindoctor(event){
      event.preventDefault();
      var result = await veternarianStore.login(email.current.value, password.current.value);
      if (result === "Invalid password") {
        alertbox(result);
      }
      else if (result === "Invalid email") {
        alertbox(result);
      }
      else {
        localStorage.setItem("admin", result._id);
        localStorage.removeItem("user");
        localStorage.setItem("vet", result._id);

        // window.location.href = "/vet/dashboard";
        navigate("/inventory");
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
                  <img src={doctorIcon} alt="Doctor" />
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
                  <button className="back-btn" type="button" onClick={() => navigate("/vet/login")}>
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

import React from "react";
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import adminStore from "../db/stores/admin";
import { Navigate } from "react-router-dom";
import PrevHeader from "./PrevHeader";
import "./styles/Register.css";
const { dialog, BrowserWindow } = window.require('electron').remote


const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export default function Register() {
  const navigate = useNavigate();


  const name = useRef();
  const password = useRef();
  const password2 = useRef();
  const email = useRef();
  const phone = useRef();
  const gender = useRef();
  const dob = useRef();
  // const [address, setAddress] = useState();

  const alertbox = (m) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(window, {
      title: '  Alert',
      buttons: ['Dismiss'],
      type: 'warning',
      message: m,
    });
  }

  function register() {
    if (password.current.value !== password2.current.value) {
      alertbox("Passwords do not match.");
        } else if (gender.current.value === "") {
      alertbox("Please select your gender");
    } else if (!email.current.value.match(emailPattern)) {
      alertbox("Please enter a valid email id");
    } else {
      const admin = {
        name: name.current.value,
        dob: dob.current.value,
        password: password.current.value,
        email: email.current.value,
        phone: phone.current.value,
        gender: gender.current.value,
      };
      let result = adminStore.create(admin);
      if (result === "Email already exists") {
        alertbox(result);
      } else {
        // localStorage.setItem("admin", result._id);
        // localStorage.removeItem("vet");
        navigate("/dashboard");
      }
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
                <div className="details-heading">
                  <h3>Enter the</h3>
                  <h3 className="closer">Following details</h3>
                </div>
                <input type="text" placeholder="Name" ref={name} required/>
                {/* <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/> */}
                <input type="phone" placeholder="Mobile No." ref={phone} required/>
                <select name="gender" id="cars" ref={gender} required>
                  <option value="" selected disabled hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non Binary">Non-Binary</option>
                </select>
                <input
                  type="text"
                  placeholder="Date of Birth"
                  ref={dob}
                  onFocus={(e) => (e.target.type = "date")}
                />
                {/* <input type ="address" placeholder="address" onChange={e => setAddress(e.target.value)}/> */}
              </div>
            </div>

            <div className="formout" id="patient-register">
              <div className="form">
                <h3>Complete your</h3>
                <h3 className="closer">Registration</h3>
                <form className="login-form">
                  <input type="text" placeholder=" Email" ref={email} required/>
                  <input
                    type="password"
                    placeholder="Password"
                    ref={password} required
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    ref={password2} required
                  />
                  <div className="buttons">
                    <button type="button" onClick={register}>
                      Proceed
                    </button>
                    <button
                      className="back-btn"
                      type="button"
                      onClick={() => navigate("/login")}
                    >
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

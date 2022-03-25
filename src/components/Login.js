import ownerStore from "../db/stores/owner";
// import veternarianStore from "../db/stores/veternarian";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./styles/Login.css";
import { Navigate } from "react-router-dom";
import PrevHeader from "./PrevHeader";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setRedirect("/dashboard");
      // window.location.href = "/dashboard";
    }
    if (localStorage.getItem("vet") != null) {
      setRedirect("/vet/dashboard");
    }
  }, []);

  async function login(event) {
    event.preventDefault();
    var result = await ownerStore.login(email, password);
    if (result === "Invalid password") {
      alert(result);
    } else if (result === "Invalid email") {
      alert(result);
    } else {
      console.log(result);
      localStorage.setItem("user", result._id);
      localStorage.removeItem("vet");
      setRedirect("/dashboard");
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="out">
      <PrevHeader />
      <div className="container-out" style={{ backgroundColor: "#002A6A" }}>
        <div className="login-page">
          <div className="login-container">
            <div className="signupout">
              <div className="signup">
                <p> New Patient? </p>
                <div className="PatientCard-image">
                  <img src="/images/Patient_icon.svg" alt="Patient" />
                </div>
                <button type="button" onClick={() => setRedirect("/register")}>
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder=" Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="buttons">
                  <button onClick={login}>Proceed</button>
                  <button type="button" className="back-btn" onClick={() => setRedirect("/")}>
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

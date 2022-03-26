import veternarianStore from "../db/stores/veternarian";
import React from "react";
import {useState} from "react";
import { useEffect } from "react";
import {Navigate} from "react-router-dom";
import PrevHeader from "./PrevHeader";

export default function AdminLogin() {
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
      // window.location.href = "/vet/dashboard";
    }
    if (localStorage.getItem("admin")!=null) {
      setRedirect("/admin/dashboard");
      // window.location.href = "/admin/dashboard";
    }
  }, [])


    async function logindoctor(event){
      event.preventDefault();
      var result = await veternarianStore.login(email, password);
      if (result === "Invalid password") {
        alert(result);
      }
      else if (result === "Invalid email") {
        alert(result);
      }
      else {
        console.log(result);
        localStorage.setItem("admin", result._id);
        localStorage.removeItem("vet");
        localStorage.removeItem("user");
        // window.location.href = "/vet/dashboard";
        setRedirect("/admin/dashboard");
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
                <p> New Vet? </p>
                <div className="PatientCard-image">
                  <img src="/images/Doctor_icon.svg" alt="Doctor" />
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder=" Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="buttons">
                  <button onClick={logindoctor}>Proceed</button>
                  <button className="back-btn" type="button" onClick={() => setRedirect("/vet/login")}>
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

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
        localStorage.setItem("vet", result._id);
        localStorage.removeItem("user");
        // window.location.href = "/vet/dashboard";
        setRedirect("/vet/dashboard");
      }
    }

    if (redirect) {
      return <Navigate to={redirect} />;
    }
  
    return (
      <div className="out">
      <PrevHeader />
    <div className="container-out">
      <div className="login-page">
        <div className="form">
          <form className="login-form">
            <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
            <button onClick={logindoctor}>login</button>
            <p className="message">Not registered? <button type="button" onClick={()=>{setRedirect("/vet/register")}}>Create an account</button></p>
            <button type="button" onClick={()=>{setRedirect("/")}}>Back</button>
          </form>
        </div>
      </div>
      </div>
      </div>
    );
}

import ownerStore from "../db/stores/owner";
import React from "react";
import {useState} from "react";
const { ipcRenderer } = window.require('electron');

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function login(event){
  event.preventDefault();
  var result = await ownerStore.login(email, password);
  if (result === "Invalid password") {
    alert(result);
  }
  else if (result === "Invalid email") {
    alert(result);
  }

  console.log(result);
}
    return (
    <div>
      <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
          <button onClick={login}>login</button>
          <p className="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
      </div>
    </div>
    </div>
    );
    }
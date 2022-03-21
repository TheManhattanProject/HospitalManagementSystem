import ownerStore from "../db/stores/owner";
import React from "react";
import {useState} from "react";
const { ipcRenderer } = window.require('electron');

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

function login(){
  var result = ownerStore.read(username);
  console.log(result);
  if(result){
      if(result.password === password){
          return result;
      }else{
          return null;
      }
  }else{
      return null;
  }

}
    return (
    <div>
      <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="username" onChange={e => setUserName(e.target.value)}/>
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
          <button onClick={login}>login</button>
          <p className="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
      </div>
    </div>
    </div>
    );
    }
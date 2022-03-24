import React from 'react';
import {useState} from 'react';
import ownerStore from "../db/stores/owner";


export default function Register() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    function register(event){
      //hash password
      event.preventDefault();
      const owner = {
        name: name,
        password: password,
        email: email,
        phone: phone,
        address: address
    }
    let result = ownerStore.create(owner);
    if (result === "Email already exists") {
        alert(result);
        }
    else if (result === "Invalid email") {
        alert(result);
        }
    else {
        localStorage.setItem("user", result._id);
        window.location.href = "/dashboard";
    }
  }
    return (    
        <div>
            <div className="register-page">
            <div className="form">
                <form className="login-form">
                    <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
                    <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
                    <input type="phone" placeholder="phone" onChange={e => setPhone(e.target.value)}/>
                    <input type ="address" placeholder="address" onChange={e => setAddress(e.target.value)}/>

                    <button onClick ={register}>register</button>
                    <p className="message">Already registered? <a href="/">Login</a></p>
                </form>
            </div>
            </div>
        </div>
    );
}


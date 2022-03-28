import React from 'react';
import {useState,useRef} from 'react';
import veternarianStore from "../db/stores/veternarian";
import { Navigate } from 'react-router-dom';
import PrevHeader from './PrevHeader'
const { dialog, BrowserWindow } = window.require('electron').remote

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

export default function Register() {
    const name = useRef();
    const password = useRef();
    const password2 = useRef();

    const email = useRef();
    const phone = useRef();
    const qualification = useRef();
    const speciality = useRef();
    const experience = useRef();
    const gender = useRef();
    const dob = useRef()
    const [redirect, setRedirect]= useState();

    const alertbox = (m) => {
      const window = BrowserWindow.getFocusedWindow();
      dialog.showMessageBox(window, {
        title: '  Alert',
        buttons: ['Dismiss'],
        type: 'warning',
        message: m,
      });
    }

    async function register(event){
      //hash password
      event.preventDefault();
      if (gender==="") {
        alert("Please select your gender");
        return;
      }
      if(password!==password2){
          alert("Passwords do not match.")
          return;
      }
      if (!email.match(emailPattern)) {
        alert("Please enter a valid email id");
        return;
      }
      const vet = {
        name: name,
        password: password,
        email: email,
        phone: phone,
        gender: gender,
        qualification: qualification,
        speciality: speciality,
    }

    let result = await veternarianStore.create(vet);
    console.log(result);

    if (result === "Email already exists") {
        alert(result);
        }
    else if (result === "Invalid email") {
        alert(result);
        }
    else {
        localStorage.setItem("vet", result._id);
        // window.location.href = "/vet/dashboard";
        setRedirect("/vet/dashboard");
    }
    

  }

    if (redirect) {
        return <Navigate to={redirect} />
    }

     return (    
    //     <div>
    //         <div className="register-page">
    //         <div className="form">
    //             <form className="login-form">
    //                 <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
    //                 <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}/>
    //                 <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)}/>
    //                 <input type="phone" placeholder="phone" onChange={e => setPhone(e.target.value)}/>
    //                 <input type ="address" placeholder="address" onChange={e => setAddress(e.target.value)}/>
    //                 <input type="text" placeholder="qualification" onChange={e => setQualification(e.target.value)}/>
    //                 <input type="text" placeholder="speciality" onChange={e => setSpeciality(e.target.value)}/>
    //                 <input type="text" placeholder="experience" onChange={e => setExperience(e.target.value)}/>
    //                 <button onClick ={register}>register</button>
    //                 <p className="message">Already registered? <button type="button" onClick={() => setRedirect("/vet/login")}>Login</button></p>
    //             </form>
    //         </div>
    //         </div>
    //     </div>
    <div className="out">
        <PrevHeader />
        <div className="container-out" style={{ backgroundColor: "#002A6A" }}>
          <div className="login-page">
            <div className="login-container">
              <div className="signupout">
                <div className="signup">
                <div className="details-heading">
                    <h3>Enter the</h3>
                    <h3 className='closer'>Following details</h3>
                </div>
                <input type="text" placeholder="Name" ref={name}/>
                     <input type="text" placeholder="Specialization" ref ={speciality} />
                     <input type="phone" placeholder="Mobile No." ref={phone}/>
                     <select name="gender" id="cars" ref={gender}>
                        <option value="" selected disabled hidden>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non Binary">Non-Binary</option>
                    </select> 
                     <input type="text" placeholder='Date of Birth' onFocus={e => e.target.type="date"} ref={dob}/>
                     {/* <input type ="address" placeholder="address" onChange={e => setAddress(e.target.value)}/> */}
                </div>
              </div>
  
              <div className="formout" id="doctor-register">
                <div className="form">
                  <h3>Complete your</h3>
                  <h3 className='closer'>Registration</h3>
                  <form className="login-form">
                    <input
                      type="text"
                      placeholder=" Email"
                      ref={email}
                      
                    />
                     <input type="password" placeholder="Password" ref={password}/>
                    <input type="password" placeholder="Confirm Password" ref={password2}/>
                    <div className="buttons">
                    <button onClick={register}>Proceed</button>
                    <button className="back-btn" type="button" onClick={() => setRedirect("/")}>
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


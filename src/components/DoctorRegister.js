import React from 'react';
import {useState,useRef} from 'react';
import AsyncCreatableSelect from "react-select/async-creatable";
import { createFilter } from "react-select";
import veternarianStore from "../db/stores/veternarian";
import { useNavigate } from 'react-router-dom';
import PrevHeader from './PrevHeader'
import DepartmetStore from "../db/stores/Department";
import './styles/DoctorRegister.css';
const { dialog, BrowserWindow } = window.require('electron').remote

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

export default function Register() {
    const name = useRef();
    const password = useRef();
    const password2 = useRef();
    const navigate = useNavigate();
    const [selectedSpeciality, SetselectedSpeciality] = useState("");

    const email = useRef();
    const phone = useRef();
    const gender = useRef();
    const dob = useRef()

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
      if (gender.current.value==="") {
        alertbox("Please select your gender");
        return;
      }
      if(password.current.value!==password2.current.value){
          alertbox("Passwords do not match.")
          return;
      }
      if (!email.current.value.match(emailPattern)) {
        alertbox("Please enter a valid email id");
        return;
      }
      const vet = {
        name: name.current.value,
        password: password.current.value,
        email: email.current.value,
        phone: phone.current.value,
        gender: gender.current.value,
        speciality: selectedSpeciality.value,
    }

    let result = await veternarianStore.create(vet);
    console.log(result);

    if (result === "Email already exists") {
        alertbox(result);
        }
    else {
        localStorage.setItem("vet", result._id);
        navigate("/vet/dashboard");
    }
    

  }

  const filterConfig = {
    ignoreCase: false,
    ignoreAccents: false,
    trim: false,
    matchFromStart: false,
    stringify: (option) => `${option.label}`,
  };

  const promiseOptionsSpeciality = async (inputValue) => {
    return DepartmetStore.readAll().then((datatemp) => {
      return datatemp.map((temp) => {
        return { value: temp.name, label: temp.name };
      });
    });
  };

  async function handleAsyncSelectSpeciality(event) {
    SetselectedSpeciality(event);
  }

  async function handleOnCreateAsyncSelectOwner(event) {
    const result = await DepartmetStore.create({ name: event });
    SetselectedSpeciality({ value: event, label: event });
  }


  const customStyles = {
    dropdownIndicator: () => ({
      color: "grey",
      paddingLeft: "10px",
      paddingRight: "5px",
    }),

    control: (provided, state) => ({
      ...provided,
        border: "1px solid black !important",
        borderRadius: "0.4rem",
      outline: "none",
      boxShadow: "none",
      width: "16rem",
      minHeight: '32px',
      height: '32px',
      backgroundColor: "white",
      marginBottom: "0.4rem",
      marginTop: "0.4rem",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: '32px',
      padding: '0 2px'
    }),
    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '30px',
    }),

    clearIndicator: () => ({
      color: "grey",
      paddingRight: "10px",
    }),
  };
   

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
    //                 <p className="message">Already registered? <button type="button" onClick={() => navigate("/vet/login")}>Login</button></p>
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
                    
                     <input  type="phone" placeholder="Mobile No." ref={phone} required/>
                     <select name="gender" id="cars" ref={gender} required>
                        <option value="" selected disabled hidden>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non Binary">Non-Binary</option>
                    </select> 
                     <input type="text" placeholder='Date of Birth' onFocus={e => e.target.type="date"} ref={dob} required/>
                     <AsyncCreatableSelect
                      value={selectedSpeciality}
                      filterOption={createFilter(filterConfig)}
                      defaultOptions
                      loadOptions={promiseOptionsSpeciality}
                      createOptionPosition={"first"}
                      onChange={handleAsyncSelectSpeciality}
                      onCreateOption={handleOnCreateAsyncSelectOwner}
                      styles={customStyles}
                      isSearchable={true}
                      placeholder={"Speciality"}
                    />
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
                      required
                      
                    />
                     <input type="password" placeholder="Password" ref={password} required/>
                    <input type="password" placeholder="Confirm Password" ref={password2} required/>
                    <div className="buttons">
                    <button onClick={register}>Proceed</button>
                    <button className="back-btn" type="button" onClick={() => navigate("/")}>
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


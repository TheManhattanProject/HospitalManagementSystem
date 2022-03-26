import React from 'react';
import {useState} from 'react';
import veternarianStore from "../db/stores/veternarian";
import { Navigate } from 'react-router-dom';
import PrevHeader from './PrevHeader'


export default function Register() {
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [qualification, setQualification] = useState();
    const [speciality, setSpeciality] = useState();
    const [experience, setExperience] = useState();
    const [redirect, setRedirect] = useState();
    const [gender, setGender] = useState();
    const [dob, setDob] = useState()

    async function register(event){
      //hash password
      event.preventDefault();
      if (gender==="") {
        alert("Please select your gender");
        return;
      }
      if(password!==password2){
          alert("Passwords do not match.")
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
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                     <input type="text" placeholder="Specialization" onChange={e => setSpeciality(e.target.value)}/>
                     <input type="phone" placeholder="Mobile No." onChange={e => setPhone(e.target.value)}/>
                     <select name="gender" id="cars" value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non Binary">Non-Binary</option>
                    </select> 
                     <input type="text" placeholder='Date of Birth' onFocus={e => e.target.type="date"} onChange={e => setDob(e.target.value)}/>
                     {/* <input type ="address" placeholder="address" onChange={e => setAddress(e.target.value)}/> */}
                </div>
              </div>
  
              <div className="formout">
                <div className="form">
                  <h3>Complete your</h3>
                  <h3 className='closer'>Registration</h3>
                  <form className="login-form">
                    <input
                      type="text"
                      placeholder=" Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                     <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)}/>
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


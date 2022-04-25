import React from 'react';
import ownerStore from '../db/stores/owner';
import {useState,useEffect, useRef} from 'react';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles/Addpatient.css'
import backIcon from "../assets/arrow.png"
const { dialog, BrowserWindow } = window.require('electron').remote
// import VaccinationForm from './VaccinationForm'

export default function Addowner() {
  const [owner, setOwner] = useState('');
  const [redirect, setRedirect] = useState();

  const alertbox = (m) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(window, {
      title: '  Alert',
      buttons: ['Dismiss'],
      type: 'warning',
      message: m,
    });
  }

  useEffect(() => {
    const owner = localStorage.getItem("admin");
    if (owner) {
        setOwner(owner);
    }
    else {
        // window.location.href = "/";
        setRedirect("/login")
    }
    }, []);

//   const [name, setName] = useState("");
    const name = useRef();
//   const [age, setAge] = useState("");
//   const [sex, setSex] = useState("");
    const gender = useRef();
//   const [species, setSpecies] = useState("");
    const phone = useRef();
//   const [bodyweight, setBodyweight] = useState("");
    const dob = useRef();
//   const [color, setColor] = useState("");
//  
    const email = useRef();
    // const profile = useRef();



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!gender.current.value) {
            alertbox("Please select the owner's gender")
        }
        
        const patient = {
            name: name.current.value,
            gender: gender.current.value, 
            dob : dob.current.value,
            phone: phone.current.value,
            email: email.current.value
        }

        console.log(patient);

        let result = await ownerStore.create(patient);
        if (result === "Email already exists") {
            alertbox(result);
            return;
        }
        console.log(result);

        //  window.location.href = "/dashboard";
        setRedirect("/dashboard");
    }

   

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer">
            <div className="lheader">
                <div onClick={()=>{setRedirect("/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>
                <Header />
            </div>
        <div className="lout">
            <Sidebar currentTab={9}/>
        <div className="cont-out">
            <h1>New Owner Registration</h1>
            <div className="cont-in">
            <form onSubmit={handleSubmit}>  
                <div className="formall">
                    {/* <div className="first"> */}
                        {/* {!profile && <div className="withoutimg">
                            <input id ="fileselect" type="file" onChange={(e)=>{fileclick(e)}}/>
                            <p>Add Photo</p>
                        </div>}
                        {profile && <div className="withimg">
                            <img src={`file://${profile}`} alt="profile"></img>
                        </div>} */}
                       
                    {/* </div> */}


                    <div className="second">
                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text" className="form-control" placeholder="Name" ref={name} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Phone :</label>
                            <input type="phone" className="form-control" ref={phone}  required />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth :</label>
                            <input
                                type="text"
                                placeholder="Date of Birth"
                                ref={dob}
                                onFocus={(e) => (e.target.type = "date")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Sex : </label>
                                <select name="gender" id="cars" ref={gender} required>
                                <option value="" selected disabled hidden>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                {/* <option value="Non Binary">Non-Binary</option> */}
                                </select> 
                        </div>
                        <div className="form-group">
                            <label>Email :</label>
                            <input type="text" className="form-control" placeholder="Email" ref={email} required />
                        </div>
                        {/* <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" placeholder="Health" ref={health} onChange={e => setHealth(e.target.value)} required/>
                        </div> */}
                    </div>



                </div>
                <div className="submit-div">
                <button type="submit" className="submit-btn">Submit</button>
                </div>
                {/* <button type="button" onClick={() => setRedirect("/dashboard")}>Go Back</button> */}
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}

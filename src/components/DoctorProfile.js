import React from 'react';
import {useState, useRef} from 'react';
import veternarianStore from "../db/stores/veternarian";
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
const { dialog, BrowserWindow } = window.require('electron').remote


export default function DoctorProfile() {
    // const [name, setName] = useState();
    const name = useRef();
    // const [email, setEmail] = useState();
    const email = useRef();
    // const [phone, setPhone] = useState();
    const phone = useRef();
    // const [address, setAddress] = useState();
    const address = useRef();
    // const [qualification, setQualification] = useState();
    const qualification = useRef();
    // const [speciality, setSpeciality] = useState();
    const speciality = useRef();
    const experience = useRef();
    const gender = useRef();
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

    async function register(){
        const data = {
            name: name.current.value,
            email:email.current.value,
            address:address.current.value,
            qualification:qualification.current.value,
            speciality:speciality.current.value,
            experience:experience.current.value,
            phone:phone.current.value,
            gender: gender.current.value
        }
        let user = localStorage.getItem("vet");
        if (!user) {
            // window.location.href = "/";
            setRedirect("/vet/login");
        }
        const result = await veternarianStore.update(user,data)
        if(result){
            alertbox("Profile Updated Successfully");
        }
        else{
            alertbox("Profile Not Updated");
        }

    }

    function reset(){
        name.current.value = "";
        email.current.value = "";
        address.current.value = "";
        qualification.current.value = "";
        speciality.current.value = "";
        experience.current.value = "";
        phone.current.value = "";
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer">
            <div className="lheader">
                <div onClick={()=>{setRedirect("/vet/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>
                <Header />
            </div>
            <div className="lout">
                <Sidebar currentTab={8}/>
                <div className="cont-out">
                <h1>Your Profile</h1>
                <div className="cont-in">
                <div className="form">
                    <form className="change-form">
                        <input type="text" placeholder="name" ref={name}/>
                        <input type="email" placeholder="email" ref ={email}/>
                        <input type="phone" placeholder="phone" ref={phone} />
                        <input type ="address" placeholder="address" ref ={address}/>
                        <input type="text" placeholder="qualification" ref={qualification}/>
                        <input type="text" placeholder="speciality" ref={speciality}/>
                        <input type="text" placeholder="experience" ref ={experience} />
                        <input type="text" placeholder="gender" ref={gender}/>
                        <button onClick ={register}>Submit</button>
                        <button onClick ={reset}>Reset</button>
                    </form>
                    {/* <button type='button' onClick={() => setRedirect("/vet/dashboard")}>Back</button> */}
                </div>
            </div>
        </div>
        </div>
    </div>
    )
}
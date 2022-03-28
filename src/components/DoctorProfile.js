import React from 'react';
import {useState, useRef} from 'react';
import veternarianStore from "../db/stores/veternarian";
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
import './styles/DoctorProfile.css'
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
    const dob = useRef();
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
            gender: gender.current.value,
            dob: dob.current.value
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
                <div className="form-div">
                    <form className="form-div-in">
                        <div className="form-in">
                        <p className="vet-detail">Vet Name : </p>
                        <input type="text" placeholder="name" ref={name}/>
                        </div>
                        <div className="form-in">
                        <p className="vet-detail">Email : </p>
                        <input type="email" placeholder="email" ref ={email}/>
                        </div>

                        <div className="form-in">
                        <p className="vet-detail">Phone : </p>
                        <input type="phone" placeholder="phone" ref={phone} />
                        </div>

                        <div className="form-in">
                        <p className="vet-detail">Address : </p>
                        <input type ="address" placeholder="address" ref ={address}/>
                        </div>

                        <div className="form-in">   
                        <p className="vet-detail">Qualification: </p>
                        <input type="text" placeholder="qualification" ref={qualification}/>
                        </div>
                        
                        <div className="form-in">
                        <p className="vet-detail">Specialization :</p>
                        <input type="text" placeholder="specialization" ref={speciality}/>
                        </div>
                        <div className="form-in">
                        <p className="vet-detail">Date of Birth : </p>
                        <input type="date" placeholder="specialization" ref={dob}/>
                        </div>
                        <div className="form-in">
                        <p className="vet-detail">Experience : </p>
                        <input type="text" placeholder="experience" ref ={experience} />
                        </div>

                        <div className="form-in">
                        <p className="vet-detail">Gender :</p>
                        <input type="text" placeholder="gender" ref={gender}/>
                        </div>
                        <div>
                        <button onClick ={register}>Submit</button>
                        <button className='reset' onClick ={reset}>Reset</button>
                        </div>
                        
                    </form>
                    {/* <button type='button' onClick={() => setRedirect("/vet/dashboard")}>Back</button> */}
                </div>
            </div>
        </div>
        </div>
    </div>
    )
}
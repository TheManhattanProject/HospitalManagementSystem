import React from 'react';
import {useState} from 'react';
import veternarianStore from "../db/stores/veternarian";
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DoctorProfile() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [qualification, setQualification] = useState();
    const [speciality, setSpeciality] = useState();
    const [experience, setExperience] = useState();
    const [gender, setGender] = useState();
    const [redirect, setRedirect] = useState();

    async function register(){
        const data = {
            name: name,
            email:email,
            address:address,
            qualification:qualification,
            speciality:speciality,
            experience:experience,
            phone:phone,
            gender: gender
        }
        let user = localStorage.getItem("vet");
        if (!user) {
            // window.location.href = "/";
            setRedirect("/vet/login");
        }
        const result = await veternarianStore.update(user,data)
        if(result){
            alert("Profile Updated Successfully");
        }
        else{
            alert("Profile Not Updated");
        }

    }

    function reset(){
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setQualification("");
        setSpeciality("");
        setExperience("");
        setGender("");

    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer">
            <div className="lheader">
                <div onClick={()=>{setRedirect("/vet/dashboard")}} className='back-div'>
                    <img src="/images/arrow.png" alt="back"></img>
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
                        <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        <input type="email" placeholder="email" value ={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="phone" placeholder="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <input type ="address" placeholder="address" value ={address} onChange={e => setAddress(e.target.value)}/>
                        <input type="text" placeholder="qualification" value={qualification} onChange={e => setQualification(e.target.value)}/>
                        <input type="text" placeholder="speciality" value={speciality} onChange={e => setSpeciality(e.target.value)}/>
                        <input type="text" placeholder="experience" value ={experience} onChange={e => setExperience(e.target.value)}/>
                        <input type="text" placeholder="gender" value={gender} onChange={e => setGender(e.target.value)}/>
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
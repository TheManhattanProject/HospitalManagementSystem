import React from 'react';
import patientStore from '../db/stores/patient';
import veternarianStore from '../db/stores/veternarian';
import appointmentStore from '../db/stores/appointments';
import {useState,useEffect} from 'react';
import './styles/BookAppointment.css';
import {Navigate} from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';


export default function BookAppointment(){
    const [patients,setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [currentPatient, setCurrentPatient] = useState();
    const [remark, setRemark] = useState();
    const [reason, setReason] = useState();
    const [date,setDate]= useState();
    const [vet,setVet]= useState();
    const [redirect, setRedirect] = useState();

    const changePatient = (patient) => {
        setCurrentPatient(patient);
        let pet_list = document.getElementsByClassName("patient-name");
        [].forEach.call(pet_list, function (card) {
            card.classList.remove("selected")
        });
        document.getElementById(patient._id).classList.add("selected");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let appointment = {
            patient: currentPatient._id,
            owner : localStorage.getItem("user"),
            veternarian: vet,
            reason: reason,
            remark: remark,
            datetime: date
        }
        console.log(appointment)
        const result = await appointmentStore.create(appointment);
        if (result){
            // window.location.href = "/dashboard";
            setRedirect("/dashboard");
        }
    }
    

    useEffect(() => {
        const getData = async () => {
            let user = localStorage.getItem("user");
            if (!user) {
                // window.location.href = "/";
                setRedirect("/");
            }
            let pets = await patientStore.getPets(user);
            setDoctors(await veternarianStore.readAll());
            setPatients(pets);
            if (pets.length !== 0) {
                setCurrentPatient(pets[0]);
                document.getElementById(pets[0]._id).classList.add("selected");
            }
            else {
                // window.location.href = "/patient/add";
                setRedirect("/patient/add");
            }
        }
        getData();
    }, []);

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer">
        <div className="lheader">
        <div onClick={()=>{setRedirect("")}} className='back-div'>
            <img src="/images/arrow.png" alt="back"></img>
            </div>
             <Header />
        </div> 
        <div className="lout">
        <Sidebar currentTab={3}/>

        <div className="cont-out">
            <h1>Book A Visit</h1>
            <div className="cont-in">
            {patients.length && <div className="pet-names">
                {patients.map(patient => <button type="button" onClick={() => changePatient(patient)} id={patient._id} className="patient-name">{patient.name}</button>)}
            </div>}
            <div className="row">
                {currentPatient && <div className="col-md-6">
                    <p>Pet Name: {currentPatient.name}</p>
                    <p>Species: {currentPatient.species}</p>
                    <p>Age: {currentPatient.age}</p>
                    <p>Sex: {currentPatient.sex}</p>
                    <p>Body Weight: {currentPatient.bodyweight}</p>
                    <p>Body Color: {currentPatient.color}</p>
                </div>}
                {doctors.length!==0 && <div className="col-md-6">
                    <label for="doctor">Doctor's Name:</label>
                    <select name="doctor" id="cars" value={vet} onChange={e => setVet(e.target.value)}>
                        <option selected disabled>--Pick an Option--</option>
                        {doctors.map(doctor => <option value={doctor._id}>{doctor.name}</option>)}
                    </select> 
                    <label for="reason">Reason Of Visit:</label>
                    <input type="text" name="reason" id="reason" value={reason} onChange={e => setReason(e.target.value)}/>
                    <label for="remarks">Special Remarks:</label>
                    <input type="text" name="remarks" id="remarks" value={remark} onChange={e => setRemark(e.target.value)}/>
                    <input type="datetime-local" name="datetime" id="datetime" onChange={e=> setDate(e.target.value)}/>
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Book Appointment</button>
                </div>}
            </div>
            <button onClick={() =>setRedirect("/dashboard")}>Back</button>
        </div>
        </div>
        </div>
        </div>
    );
}
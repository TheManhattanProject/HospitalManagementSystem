import React from 'react';
import patientStore from '../db/stores/patient';
import veternarianStore from '../db/stores/veternarian';
import {useState,useEffect} from 'react';


export default function BookAppointment(){
    const [patients,setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [currentPatient, setCurrentPatient] = useState();

    console.log(currentPatient);

    const getData = async () => {
        let user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "/";
        }
        setDoctors(await veternarianStore.readAll());
        setPatients(await patientStore.getPets(user))
        setCurrentPatient(await patientStore.getLastPatient(user));
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
            {patients.length && <div className="pet-names">
                {patients.map(patient => <p>{patient.name}</p>)}
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
                {doctors.length && <div className="col-md-6">
                    <label for="doctor">Doctor's Name:</label>
                    <select name="doctor" id="cars">
                        {doctors.map(doctor => <option value={doctor._id}>{doctor.name}</option>)}
                    </select> 
                    <label for="reason">Reason Of Visit:</label>
                    <input type="text" name="reason" id="reason" />
                    <label for="remarks">Special Remarks:</label>
                    <input type="text" name="remarks" id="remarks" />
                </div>}
            </div>
            <button onClick={() => window.location.href = "/dashboard"}>Back</button>
        </div>
    );
}
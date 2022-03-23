import React from 'react';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import appointmentStore from "../db/stores/appointments";
import AppointmentCard from './AppointmentCard';


export default function Patienthistory() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    console.log(pid);
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [appointments, setAppointments] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);

    console.log(patient);


    useEffect(() => {
    const getData = async() => {
        let user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "/";
        }
        user = localStorage.getItem("vet");
        if (!user) {
            window.location.href = "/";
        }
        let pt = await patientStore.getPatient(pid)
        setPatient(pt);
        setAppointment(await appointmentStore.getLastAppointment(pid));
        setAppointments(await appointmentStore.getAppointments(pid));
        setVaccinations(await patientStore.getVaccinations(pid));
    };
      
      getData();
      
    }, [pid]);

  return (
    <div>
      <h1>History</h1>
     {patient && <div className="row">
        <div className="col-md-4">
          <p>Pet Name: {patient.name}</p>
          <p>Species: {patient.species}</p>
          <p>Age: {patient.age}</p>
          <p>Sex: {patient.sex}</p>
          <p>Body Weight: {patient.bodyweight}</p>
          <p>Body Color: {patient.color}</p>
          <p>Fertility: {patient.fertility}</p>
        </div>
        {vaccinations.length!==0 && <div className="col-md-4">
          <p>Vaccination Chart:</p>
          <div className="vaccinations">
            {vaccinations.map(v => (
              <div className="vaccination" key={v._id}>
                <p>{v.name}</p>
                <p>{v.datetime}</p>
              </div>
            ))}
          </div>
        </div>}
        {appointment && <div className="col-md-4">
          <p>Last Visit</p>
          <p>Doctor's Name: {appointment.veternarian.name}</p>
          <p>Reason Of Visit: {appointment.reason}</p>
          <p>Date Of Visit: {appointment.datetime}</p>
        </div>}
      </div>}
      <h3>Previous Visits</h3>
      {appointments.length!==0 && <div className="prev-visits">
      {appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
      </div>}
      <button onClick={() => window.location.href = "/dashboard"}>Back</button>
    </div>
  );
}
import React from 'react';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import appointmentStore from "../db/stores/appointment";
import AppointmentCard from './AppointmentCard';


export default function Patienthistory() {
    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [patient, setPatient] = useState(null);
    const [appointment, setAppointment] = useState([]);
    const [appointments, setAppointments] = useState([]);
    setPatient(patientStore.getPatient(pid));
    setAppointment(appointmentStore.getLastAppointment(pid));
    setAppointments(appointmentStore.getAppointments(pid));
    let temp = appointment;
    temp.veterinarian = appointmentStore.getVeterinarian(appointment.veterinarian);
    setAppointment(temp);

  return (
    <div>
      <h1>History</h1>
      <div className="row">
        <div className="col-md-6">
          <p>Pet Name: {patient.name}</p>
          <p>Species: {patient.species}</p>
          <p>Age: {patient.age}</p>
          <p>Sex: {patient.sex}</p>
          <p>Body Weight: {patient.bodyweight}</p>
          <p>Body Color: {patient.color}</p>
        </div>
        {appointment && <div className="col-md-6">
          <p>Last Visit</p>
          <p>Doctor's Name: {appointment.veterinarian.name}</p>
          <p>Reason Of Visit: {appointment.reason}</p>
          <p>Date Of Visit: {appointment.datetime}</p>
        </div>}
      </div>
      <h3>Previous Visits</h3>
      <div className="prev-visits">
      {appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
      </div>
    </div>
  );
}
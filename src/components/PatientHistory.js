import React from 'react';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import appointmentStore from "../db/stores/appointments";
import vaccineStore from "../db/stores/vaccine";
import veternarianStore from '../db/stores/veternarian';
import PrevVisits from './PrevVisits';
import {Navigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';



export default function Patienthistory() {
    const [searchParams, setSearchParams] = useSearchParams();

    const pid = searchParams.get("id");
    const apptid = searchParams.get("apptid"); 
    console.log(pid);
    console.log(apptid);
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [appointments, setAppointments] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [doctor , setDoctor] = useState();
    const [redirect , setRedirect] = useState();


    console.log(patient);


    useEffect(() => {
    const getData = async() => {
        let user = localStorage.getItem("user");
        if (!user) {
          user = localStorage.getItem("vet");
          if (!user) {
            setRedirect("/");
          }
          else{
              setDoctor(user);
          }
  
        }
        let pt = await patientStore.getPatient(pid)
        setPatient(pt);
        let appts = await appointmentStore.getAppointments(pid);
        setAppointments(appts);
        if (apptid) {
          let currappt = await appointmentStore.read(apptid);
          if (currappt && currappt.veternarian) {
            currappt.veternarian = await veternarianStore.read(currappt.veternarian);
          }
          setAppointment(currappt);
        } else {
          let currappt = appts[0];
          if (currappt && currappt.veternarian) {
            currappt.veternarian = await veternarianStore.read(currappt.veternarian);
          }
          setAppointment(currappt);
        }
        setVaccinations(await vaccineStore.getVaccinations(pid));
    };
      
      getData();
      
    }, [pid, apptid]);
      
    if (redirect) {
      return <Navigate to= {redirect} />;
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
        <Sidebar currentTab={2}/>

    <div className='cont-out'>
      <h1>History</h1>
      <div className="cont-in">
        {patient && <div className="row">
          <div className="col-md-4">
            <p>Pet Name: {patient.name}</p>
            <p>Species: {patient.species}</p>
            <p>Age: {patient.age}</p>
            <p>Sex: {patient.sex}</p>
            <p>Body Weight: {patient.bodyweight}</p>
            <p>Body Color: {patient.color}</p>
            <p>Fertility:</p>
            {patient.fertility === "yes" ? <input type="radio" id="fertility-yes" name="fertility-radio" value="yes" selected disabled/> : <input type="radio" id="fertility-yes" name="fertility-radio" value="yes" disabled/>}
            <label for="fertility-yes">Yes</label>
            {patient.fertility === "no" ? <input type="radio" id="fertility-no" name="fertility-radio" value="no" disabled/> : <input type="radio" id="fertility-no" name="fertility-radio" value="no" selected disabled/>}
            <label for="fertility-no">No</label>
            {appointment && appointment.veternarian === doctor && !appointment.prescription && <a href={`/prescription/new?id=${appointment._id}`}>Add Prescription</a>}
          </div>
          <div className="col-md-4">
            <p className='sub-heading'>Vaccination Chart:</p>
            {vaccinations.length!==0 && <div className="vaccinations">
              {vaccinations.map(v => (
                <div className="vaccination" key={v._id}>
                  <p>{v.name}</p>
                  <p>{v.datetime}</p>
                </div>
              ))}
            </div>}
          </div>
          {appointment && <div className="col-md-4">
            <p className='sub-heading'>Last Visit</p>
            {appointment.veternarian && <p>Doctor's Name: {appointment.veternarian.name}</p>}
            <p>Reason Of Visit: {appointment.reason}</p>
            <p>Date Of Visit: {appointment.datetime}</p>
            {appointment.prescription && <button onClick={()=>{setRedirect(`/prescription?id=${appointment._id}`)}}>View Full Prescription</button>}
          </div>}
        </div>}
        <PrevVisits appointments={appointments}/>
        {doctor ? 
          <button type="button" onClick={() => setRedirect("/vet/dashboard")}> Back </button> 
          : 
          <button type="button" onClick={() => setRedirect("/dashboard")}>Back</button>
        }
      </div>
    </div>
    </div>
    </div>
  );
}
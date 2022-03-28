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
import backIcon from "../assets/arrow.png"
import './styles/PatientHistory.css';
import Select from "react-select"

export default function Patienthistory() {

  // useEffect(()=>{
  //   window.location.reload();
  // }, [])

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const appid = searchParams.get("apptid"); 
    const [apptid, setapptid] = useState(appid);
    console.log(pid);
    console.log(apptid);
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [appointments, setAppointments] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);
    const [doctor , setDoctor] = useState();
    const [redirect , setRedirect] = useState();
    const [patients, setPatients] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectedpet, setSelectedpet] = useState();


    console.log(patient);

    useEffect(()=>{
    
      console.log(appointment)
    }, [appointment])

    const setcurrappointment = (appointment) => {
      setAppointment(appointment);
    }



    useEffect(() => {
    const getData = async() => {
      console.log(apptid)
        let user = localStorage.getItem("user");
        if (!user) {
          user = localStorage.getItem("vet");
          if (!user) {
            user = localStorage.getItem("admin");
            if (!user) {
              setRedirect("/");
            } else{
              setDoctor(user);
              setPatients(await appointmentStore.getVetPets(user));
            }
          }
          else{
              setDoctor(user);
              setPatients(await appointmentStore.getVetPets(user));
          }
        } else {
          setPatients(await patientStore.getPets(user))
        }
        if (pid) {
          let pt = await patientStore.getPatient(pid)
          setPatient(pt);
          setSelectedpet(pt._id)
          // if (pt) {
          //   let appts = await appointmentStore.getAppointments(pt._id);
          //   setAppointments(appts);
          // }
        } 
        // else if(user) {
        //   appts = await appointmentStore.getPastAppointments(user);
        //   setAppointments(appts);
        // }
        if (apptid) {
          let currappt = await appointmentStore.read(apptid);
          if (currappt && currappt.veternarian) {
            currappt.veternarian = await veternarianStore.read(currappt.veternarian);
          }
          setAppointment(currappt);
        } 
        // else {
        //   let currappt = appts[0];
        //   if (currappt && currappt.veternarian) {
        //     currappt.veternarian = await veternarianStore.read(currappt.veternarian);
        //   }
        //   setAppointment(currappt);
        // }
        setVaccinations(await vaccineStore.getVaccinations(pid));
    };
      
      getData();
      
    }, [pid, apptid]);

    useEffect(() =>{
      if (selectedpet) {
          if (patients) {
            patients.forEach((pet) => {
              if (pet._id === selectedpet.value) {
                setPatient(pet);
              }
            })
          }
      }
  },[selectedpet, patients])

  useEffect(() => {
    if (patients) {
      var opts = []
      patients.forEach((pet) => {
        opts.push({value: pet._id, label: pet.name})
      })
      setOptions(opts);
    }
  }, [patients])

  useEffect (() => {
    const updateAppts = async () => {
      let appts = await appointmentStore.getAppointments(patient._id);
      setAppointments(appts);
      setAppointment();
      setVaccinations(await vaccineStore.getVaccinations(patient._id))
    }
    if (patient) {
      updateAppts();
    }
  }, [patient])

      
    if (redirect) {
      return <Navigate to= {redirect} />;
    }

  return (
    <div className="outer"> 
        <div className="lheader">
        {doctor ? 
          <div onClick={()=>{setRedirect("/vet/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>
          : 
          <div onClick={()=>{setRedirect("/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>

        }
                
                <Header />
          </div>

        <div className="lout"> 
        <Sidebar currentTab={2}/>

    <div className='cont-out'>
      <h1>History</h1>
      <div className="cont-in">
        {patients.length!==0 && <div className="pet-names">
            <p className="sub-heading-book">Select a patient :</p>
            {/* <select name="doctor" id="cars" value={vet} onChange={e => setCurrentPatient(patients[e.target.value])}>
                        <option selected disabled>Select a pet</option>
                        {patients.map((patient,i) => <option value={i}>{patient.name}</option>)}
            </select>  */}
            <Select className ="selectbar" defaultValue={selectedpet} options={options} onChange={setSelectedpet}/>
            </div>}
        {patient && <div className="all-info">
          <div className="patient-row">
            <div className="pet-row">
              <p className="pet-detail">Pet Name: </p>
              <p>{patient.name}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Species: </p>
              <p>{patient.species}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Age: </p>
              <p>{patient.age}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Sex: </p>
              <p>{patient.sex}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Body Weight: </p>
              <p>{patient.bodyweight}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Body Color: </p>
              <p>{patient.color}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Fertility: </p>
              {patient.fertility === "yes" ? <input type="radio" id="fertility-yes" name="fertility-radio" value="yes" checked disabled/> : <input type="radio" id="fertility-yes" name="fertility-radio" value="yes" disabled/>}
              <label for="fertility-yes">Yes</label>
              {patient.fertility === "no" ? <input type="radio" id="fertility-no" name="fertility-radio" value="no" checked disabled/> : <input type="radio" id="fertility-no" name="fertility-radio" value="no" disabled/>}
              <label for="fertility-no">No</label>
            </div>
            {appointment && appointment.veternarian === doctor && !appointment.prescription && <a href={`/prescription/new?id=${appointment._id}`}>Add Prescription</a>}
          </div>
          <div className="vaccination-row">
            <p className='sub-heading'>Vaccination Chart:</p>
            {vaccinations.length!==0 && <div className="vaccinations">
              {vaccinations.map((vaccination, i) => (
                <div className="vaccinationCard" key={vaccination._id}>
                    <p className='bold-text'>{vaccination.name}</p>
                    <p  className='bold-text'>{vaccination.datetime}</p>
                </div>
              ))}
            </div>}
          </div>
          {appointment && <div className="patient-row">
            <p className='sub-heading'>Last Visit</p>
            {appointment.veternarian && <div className="pet-row">
              <p className="pet-detail">Doctor's Name: </p>
              <p>{appointment.veternarian.name}</p>
            </div>}
            <div className="pet-row">
              <p className="pet-detail">Reason Of Visit: </p>
              <p>{appointment.reason}</p>
            </div>
            <div className="pet-row">
              <p className="pet-detail">Date Of Visit: </p>
              <p>{appointment.datetime}</p>
            </div>
            {appointment.prescription && <button onClick={()=>{setRedirect(`/prescription?id=${appointment._id}`)}}>View Full Prescription</button>}
            {/* {appointment.prescription && <button onClick={()=>{router.push(`/prescription?id=${appointment._id}`)}}>View Full Prescription</button>} */}
          </div>}
          <div className="empty-div"></div>
        </div>}
        <PrevVisits  setcurrappointment={setcurrappointment} appointments={appointments} appointment={apptid ? appointment:{_id:0}}/>
        {/* {doctor ? 
          <button type="button" onClick={() => setRedirect("/vet/dashboard")}> Back </button> 
          : 
          <button type="button" onClick={() => setRedirect("/dashboard")}>Back</button>
        } */}
      </div>
    </div>
    </div>
    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import appointmentsStore from '../db/stores/appointments';
import VetAppointmentCard from './VetAppointmentCard';
import Pet from './Pet';
import Sidebar from './Sidebar';
import './styles/VetDashboard.css';
import { useNavigate } from "react-router-dom";
import Header from './Header';
import backIcon from "../assets/arrow.png"

export default function VetDashboard() {

    const [appointments, setAppointments] = useState([]);
    const [futureappt, setFutureappt] = useState([]);
    const [patients, setPatients] = useState([]);
    const navigate = useNavigate();
    

    const getData = async () => {
        let user = localStorage.getItem("vet");
        if (user) {
            let appt = await appointmentsStore.getVetTodayAppointments(user);
            setAppointments(appt);
            let pets = await appointmentsStore.getVetPets(user);
            setPatients(pets);
            let future = await appointmentsStore.getFutureAppointments(user);
            setFutureappt(future);
        }
        else {
            navigate("/login");
        }
    }
 

    console.log(patients);

    useEffect(() => {
        getData();
    }, []);


    return (
        <div className="outer">
        <div className="lheader">
            <div onClick={()=>{navigate("/vet/dashboard")}} className='back-div'>
                <img src={backIcon} alt="back"></img>
            </div>
            <Header />
        </div>
        <div className="lout">
        <Sidebar currentTab={4}/>
        <div className="cont-out">
        <h1>Home</h1>
        <div className="cont-in">
            <div className="doc-all">
                <div className="doc-first">
                <h3>Future Appointments</h3>
                   
                   <div className="appointments">
                       {futureappt.length!==0 && futureappt.map(appointment => <VetAppointmentCard key={appointment._id} appointment={appointment} />)}
                   </div>

                    <h3>Today's Appointments</h3>
                   
                    <div className="appointments">
                        {appointments.length!==0 && appointments.map(appointment => <VetAppointmentCard key={appointment._id} appointment={appointment} />)}
                    </div>

                  
                </div>
                <div className="doc-second">
                    <h3>Past Patients</h3>
                    <div className="past-patients">
                        {patients.length!==0 && patients.map(patient => <Pet key={patient._id} pet={patient} />)}
                    </div>
                </div>
                
        </div>
        </div>
        </div>
        </div>
        </div>
    );

}
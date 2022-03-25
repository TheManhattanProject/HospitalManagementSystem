import { useState, useEffect } from "react";
import appointmentsStore from '../db/stores/appointments';
import VetAppointmentCard from './VetAppointmentCard';
import Pet from './Pet';
import Sidebar from './Sidebar';
import './styles/VetDashboard.css';
import {Navigate} from 'react-router-dom';
import Header from './Header';

export default function VetDashboard() {

    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [redirect, setRedirect] = useState();

    const getData = async () => {
        let user = localStorage.getItem("vet");
        if (user) {
            let appt = await appointmentsStore.getVetTodayAppointments(user);
            setAppointments(appt);
            let pets = await appointmentsStore.getVetPets(user);
            setPatients(pets);
        }
        else {
            setRedirect("/login");
        }
    }
    function logout(){
        localStorage.removeItem("vet");
        localStorage.removeItem("user");
        setRedirect("/login");
    }

    console.log(patients);

    useEffect(() => {
        getData();
    }, []);

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer">
           <div className="out"> 
        <Header/>
        <div className="container">
        <h1>Home</h1>
            <div className="row">
                <div className="col-md-6">
                    <h3>Today's Appointments</h3>
                    <Sidebar/>
                    <div className="appointments">
                        {appointments.length!==0 && appointments.map(appointment => <VetAppointmentCard key={appointment._id} appointment={appointment} />)}
                    </div>
                </div>
                <div className="col-md-6">
                    <h3>Past Patients</h3>
                    <div className="patients">
                        {patients.length!==0 && patients.map(patient => <Pet key={patient._id} pet={patient} />)}
                    </div>
                </div>
                <button type="button" onClick={setRedirect(`/inventory`)}>Inventory</button>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
        </div>
        </div>
    );

}
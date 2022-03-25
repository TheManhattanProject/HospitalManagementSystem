import React from 'react';
import patientStore from '../db/stores/patient';
import appointmentsStore from '../db/stores/appointments';
import { useEffect, useState } from 'react';
import PrevVisits from './PrevVisits';
import Pet from './Pet';
import './styles/Dashboard.css';
import { Navigate } from 'react-router-dom';

export default function Dashboard(){

    
        
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [redirect, setRedirect] = useState();

    function logout(){
        localStorage.removeItem("user");
        // window.location.href = "/";
        setRedirect("/");
    }

    const getData = async() => {
        let user = localStorage.getItem("user");
        if (!user) {
            // window.location.href = "/";
            setRedirect("/");
        }
        console.log(user)
        let pets = await patientStore.getPets(user);
        setPets(pets);
        setAppointments(await appointmentsStore.getPastAppointments(user))
    }
    
    useEffect(()=> {
        getData();
    }, [])

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="container-out">
            <h1>Home</h1>
            <h3>Your Pets</h3>
            <div className="container-in">
            <div className="pets">
                {pets.length!==0 && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <button type="button" onClick={() => setRedirect("/patient/add")}>Add Patient</button>
                </div>
            </div>
            <PrevVisits appointments={appointments}/>
            {/* <h3>Previous Visits</h3>
            <div className="appointments">
                {appointments.length!==0 && appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
            </div> */}
            <button type="button" onClick={() => setRedirect('/appointment')}>BookAppointment</button>
            <button type="button" onClick={() => setRedirect('/patients')}>Your pets</button>
            <button onClick={logout}>Logout</button>


        </div>
        </div>
    )
}
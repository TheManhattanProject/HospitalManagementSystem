import React from 'react';
import patientStore from '../db/stores/patient';
import appointmentStore from '../db/stores/appointment';
import { useEffect, useState } from 'react';
import AppointmentCard from './AppointmentCard';
import Pet from './Pet';

export default function Dashboard(){

    
        
    const [pets, setPets] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const getData = () => {
        let user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "/";
        }
        setPets(patientStore.getPets(user))
        setAppointments(appointmentStore.getPastAppointments(user))
    }
    
    useEffect(()=> {
        getData();
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <h3>Your Pets</h3>
            <div className="pets">
                {pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <a href="/patient/add">Add Patient</a>
                </div>
            </div>
            <h3>Previous Visits</h3>
            <div className="appointments">
                {appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
            </div>

        </div>
    )
}
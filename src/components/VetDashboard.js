import { useState, useEffect } from "react";
import appointmentsStore from '../db/stores/appointments';
import VetAppointmentCard from './VetAppointmentCard';
import Pet from './Pet';

export default function VetDashboard() {

    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);

    const getData = async () => {
        let user = localStorage.getItem("vet");
        if (user) {
            let appointments = await appointmentsStore.getVetTodayAppointments(user);
            setAppointments(appointments);
            let patients = await appointmentsStore.getVetPets(user);
            setPatients(patients);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container">
        <h1>Home</h1>
            <div className="row">
                <div className="col-md-6">
                    <h3>Today's Appointments</h3>
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
            </div>
        </div>
    );

}
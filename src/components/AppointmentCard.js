import { useEffect, useState } from "react/cjs/react.production.min";
import ownerStore from "../db/stores/owner";
import patientStore from "../db/stores/patient";
import veterinarianStore from "../db/stores/veterinarian";


export default function AppointmentCard(props) {

    const [appointment, setAppointment] = useState(props.appointment);

    useEffect(() => {
        let temp = appointment;
        temp.patient = patientStore.getPatient(appointment.patient);
        temp.veterinarian = veterinarianStore.getVeterinarian(appointment.veterinarian);
        setAppointment(temp);
    }, []);

  return (
    <div className="appointmentCard">
        <h3>{appointment.veterinarian.name}</h3>
        <p>{appointment.datetime}</p>
        <p>{appointment.patient.name}</p>
        <a href={`/prescription?id=${appointment._id}`}>View Prescription</a>
    </div>
  );
}

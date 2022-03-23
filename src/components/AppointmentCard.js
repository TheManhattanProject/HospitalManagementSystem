import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import veternarianStore from "../db/stores/veternarian";


export default function AppointmentCard(props) {

    const [appointment, setAppointment] = useState(props.appointment);

    function getData() {
      let temp = appointment;
      temp.patient = patientStore.getPatient(appointment.patient);
      temp.veternarian = veternarianStore.getVeterinarian(appointment.veternarian);
      setAppointment(temp);
    }

    useEffect(() => {
        getData();
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

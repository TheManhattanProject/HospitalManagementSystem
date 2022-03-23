import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import veternarianStore from "../db/stores/veternarian";


export default function AppointmentCard(props) {

    const [patient, setPatient] = useState();
    const [veternarian, setVet] = useState();
    

    useEffect(() => {
      function getData() {
        let patient = patientStore.getPatient(props.appointment.patient);
        let veternarian = veternarianStore.getVeterinarian(props.appointment.veternarian);
        setPatient(patient);
        setVet(veternarian);
      }
      getData();
    }, [props.appointment.patient, props.appointment.veternarian]);

  return (
    <div className="appointmentCard">
        <h3>{veternarian && veternarian.name}</h3>
        <p>{props.appointment.datetime}</p>
        <p>{patient && patient.name}</p>
        <a href={`/prescription?id=${props.appointment._id}`}>View Prescription</a>
    </div>
  );
}

import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
// import veternarianStore from "../db/stores/veternarian";
import ownerStore from "../db/stores/owner";
import './styles/VetAppointmentCard.css';
import {Navigate} from 'react-router-dom';


export default function VetAppointmentCard(props) {

    const [patient, setPatient] = useState();
    const [owner, setOwner] = useState();
    const [redirect, setRedirect] = useState();
    

    useEffect(() => {
      async function getData() {
        let patient = await patientStore.getPatient(props.appointment.patient);
        let owner = await ownerStore.read(patient.owner);
        setPatient(patient);
        setOwner(owner);
      }
      getData();
    }, [props.appointment.patient, props.appointment.veternarian]);

    if (redirect) {
      return <Navigate to={redirect} />;
    }

  return (
    <div className="appointmentCard">
        <div className="time">
            <p>{props.appointment.datetime}</p>
        </div>
        <div className="pet-details">
            <div className="pet-name">
                <p>{patient && patient.name}</p>
                <p>Owned By {owner && owner.name}</p>
            </div>
            <div className="open-button">
                {patient && <button type ="button" onClick={setRedirect(`/patient/history?id=${patient._id}&apptid=${props.appointment._id}`)}>Open</button>}
            </div>
        </div>
    </div>
  );
}
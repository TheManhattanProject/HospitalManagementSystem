import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import veternarianStore from "../db/stores/veternarian";
import ownerStore from "../db/stores/owner";
import './styles/VetAppointmentCard.css';


export default function VetAppointmentCard(props) {

    const [patient, setPatient] = useState();
    const [owner, setOwner] = useState();
    

    useEffect(() => {
      async function getData() {
        let patient = await patientStore.getPatient(props.appointment.patient);
        let owner = await ownerStore.read(patient.owner);
        setPatient(patient);
        setOwner(owner);
      }
      getData();
    }, [props.appointment.patient, props.appointment.veternarian]);

  return (
    <div className="appointmentCard">
        <div className="time">
            <p>{props.appointment.datetime.substring(11, 16)}</p>
        </div>
        <div className="pet-details">
            <div className="pet-name">
                <p>{patient && patient.name}</p>
                <p>Owned By {owner && owner.name}</p>
            </div>
            <div className="open-button">
                {patient && <a href={`/patient/history?id=${patient._id}&apptid=${props.appointment._id}`}>Open</a>}
            </div>
        </div>
    </div>
  );
}

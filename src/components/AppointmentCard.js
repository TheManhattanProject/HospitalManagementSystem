import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import veternarianStore from "../db/stores/veternarian";
import { useNavigate } from "react-router-dom";
import "./styles/AppointmentCard.css"

export default function AppointmentCard(props) {

  const navigate = useNavigate();
    const [patient, setPatient] = useState();
    const [veternarian, setVet] = useState();
    const [appointment, setAppointment] = useState(props.appointment);




    useEffect(() => {
      async function getData() {
        let patient = await patientStore.getPatient(props.appointment.patient);
        let veternarian = await veternarianStore.getVeterinarian(props.appointment.veternarian);
        let appt = props.appointment;
        setPatient(patient);
        setVet(veternarian);
        if (veternarian){
          appt.veternarian = veternarian;
          setAppointment(appt)
        }
      }
      getData();
    }, [props.appointment.patient, props.appointment.veternarian, props.appointment]);




  return (
    <div className="appointmentCard">
        <h3>{veternarian && veternarian.name}</h3>
        <p>{props.appointment.datetime}</p>
        {props.setcurrappointment && <button type="button" onClick={() => props.setcurrappointment(appointment)}> Prescription </button>}
        {!props.setcurrappointment && patient && props.appointment && <button type="button" onClick={() => navigate(`/patient/history?id=${patient._id}&apptid=${props.appointment._id}`)}> Prescription </button>}
    </div>
  );
}

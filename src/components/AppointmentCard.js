import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import veternarianStore from "../db/stores/veternarian";
import { Navigate } from "react-router-dom";
import "./styles/AppointmentCard.css"

export default function AppointmentCard(props) {

    const [patient, setPatient] = useState();
    const [veternarian, setVet] = useState();
    const [redirect, setRedirect] = useState();
    const [appointment, setAppointment] = useState(props.appointment);

    // const getFormattedDate = (date) => {
    //     var dd = date.getDate();
    //     var mm = date.getMonth() + 1;
    //     var yyyy = date.getFullYear();
    //     if (dd < 10) {
    //         dd = '0' + dd;
    //     }
    //     if (mm < 10) {
    //         mm = '0' + mm;
    //     }
    //     return dd + '/' + mm + '/' + yyyy;
    // }
    

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

    console.log(props.appointment);
    console.log(props.setcurrappointment)

    if (redirect) {
      return <Navigate to={redirect} />;
    }

  return (
    <div className="appointmentCard">
        <h3>{veternarian && veternarian.name}</h3>
        <p>{props.appointment.datetime}</p>
        {/* <p>{patient && patient.name}</p> */}
        {props.setcurrappointment && <button type="button" onClick={() => props.setcurrappointment(appointment)}> Prescription </button>}
        {!props.setcurrappointment && patient && props.appointment && <button type="button" onClick={() => setRedirect(`/patient/history?id=${patient._id}&apptid=${props.appointment._id}`)}> Prescription </button>}
    </div>
  );
}

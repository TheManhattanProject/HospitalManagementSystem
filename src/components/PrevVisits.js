import AppointmentCard from './AppointmentCard';
import './styles/PrevVisits.css';

export default function PrevVisits(props) {
  console.log(props.appointment)
  console.log(props.appointments)
  console.log(props)
  // props.setcurrappointment(props.appointments[1]);
  // console.log(props.setcurrappointment)
  return (
  <div className="prev-visits-container">
    <p className='sub-heading'>Previous Visits</p>
    {props.appointments.length !== 0 && <div className="prev-visits">
    {props.appointment && props.appointments.length!==0 && props.appointments.map(appointment => {
      if (appointment._id !== props.appointment._id){
        if (props.setcurrappointment) {
          return <AppointmentCard setcurrappointment={props.setcurrappointment} key={appointment._id} appointment={appointment}/>
        }
        return <AppointmentCard key={appointment._id} appointment={appointment}/>
      }
      return null;
      })}
    </div>}
  </div>)
}
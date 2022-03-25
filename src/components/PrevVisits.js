import AppointmentCard from './AppointmentCard';
import './styles/PrevVisits.css';

export default function PrevVisits(props) {
  return (
  <div className="prev-visits-container">
    <p className='sub-heading'>Previous Visits</p>
    {props.appointments.length !== 0 && <div className="prev-visits">
    {props.appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
    </div>}
  </div>)
}
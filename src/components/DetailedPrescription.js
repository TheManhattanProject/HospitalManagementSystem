import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import prescriptionStore from '../db/stores/prescriptions';
import patientStore from '../db/stores/patient';
import appointmentStore from '../db/stores/appointments';
import veterinarianStore from '../db/stores/veternarian';
import filesStore from '../db/stores/files';
import treatmentStore from '../db/stores/treatment'
import investigationStore from '../db/stores/investigation';

export default function DetailedPrescription() {

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [appointment, setAppointment] = useState();
    const [reports, setReports] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        const getData = async() => {
            let appt = await appointmentStore.read(pid);
            setAppointment(appt);
            appt.veterinarian = await veterinarianStore.getVeterinarian(appt.veterinarian);
            appt.prescription = await prescriptionStore.getPrescription(appt.prescription);
            appt.patient = await patientStore.getPatient(appt.patient);
            setAppointment(appt);
            setPhotos(await filesStore.getPhotos(appt._id));
            if (appt.prescription) {
                setReports(await investigationStore.getReports(appt.prescription._id));
                setTreatments(await treatmentStore.getTreatments(appt.prescription._id));
            }
        }
        localStorage.getItem("user") ? getData() : localStorage.getItem("vet")? getData() : window.location.href = "/";
    }, [pid]);

    return (
        <div className="container">
            <h1>History</h1>
            {appointment && <div className="row">
                <div className="col-md-4">
                    <p>Pet Name: {appointment.patient.name}</p>
                    <p>Species: {appointment.patient.species}</p>
                    <p>Age: {appointment.patient.age}</p>
                    <p>Sex: {appointment.patient.sex}</p>
                    <p>Body Weight: {appointment.patient.bodyweight}</p>
                    <p>Body Color: {appointment.patient.color}</p>
                </div>
                <div className="col-md-4">
                    <p>Last Visit</p>
                    {appointment.veterinarian && <p>Doctor's Name: {appointment.veterinarian.name}</p>}
                    <p>Reason Of Visit: {appointment.reason}</p>
                    <p>Date Of Visit: {appointment.datetime}</p>
                    {appointment.prescription && <p>Diagnosis: {appointment.prescription.diagnosis}</p>}
                    {appointment.prescription && <p>Investigations: {appointment.prescription.investigations}</p>}
                    {/* <p>Treatment: {appointment.prescription.treatment}</p> */}
                </div>
                <div className="col-md-4">
                    {/* <p>Investigation Reports</p>
                    {reports.map(report => (<p>{report.title}</p>))} */}
                    <p>Photos</p>
                    {photos.length!==0 && photos.map(report => (<p>{report.title}</p>))}
                    {appointment.prescription && <p>Next Date Of Visit: {appointment.prescription.nextAppointment}</p>}
                </div>
            </div>}
            <h3>Treatments</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Drug Name / Treatment</th>
                        <th>Frequency</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {treatments.length!==0 && treatments.map((t,i) => (
                        <tr key={t._id}>
                            <td>{i+1}</td>
                            <td><input type="text" value={t.drug}/></td>
                            <td><input type="text" value={t.frequency}/></td>
                            <td><input type="text" value={t.remarks}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
            {appointment && <a href={`/patient/history?id=${appointment.patient._id}&apptid=${appointment._id}`}>Go Back</a>}
       
        </div>
    )
}
import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import prescriptionStore from '../db/stores/prescriptions';
import patientStore from '../db/stores/patient';
import appointmentStore from '../db/stores/appointments';
import veterinarianStore from '../db/stores/veternarian';
import filesStore from '../db/stores/files';
import treatmentStore from '../db/stores/treatment'
import investigationStore from '../db/stores/investigation';
import vaccineStore from '../db/stores/vaccine';
const {ipcRenderer} = window.require('electron');

export default function DetailedPrescription() {

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [appointment, setAppointment] = useState();
    const [reports, setReports] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);

    const openFile = (file) => {
        console.log(ipcRenderer);
        ipcRenderer.invoke('open-file', file);
        console.log(file);
    }
    

    useEffect(() => {
        const getData = async() => {
            let appt = await appointmentStore.read(pid);
            setAppointment(appt);
            appt.veterinarian = await veterinarianStore.getVeterinarian(appt.veterinarian);
            appt.prescription = await prescriptionStore.getPrescription(appt.prescription);
            appt.patient = await patientStore.getPatient(appt.patient);
            setAppointment(appt);
            if (appt.prescription) {
                setPhotos(await filesStore.getPhotos(appt.prescription._id));
                setReports(await investigationStore.getReports(appt.prescription._id));
                setTreatments(await treatmentStore.getTreatments(appt.prescription._id));
            }
            if (appt.patient) {
                setVaccinations(await vaccineStore.getVaccinations(appt.patient._id));
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
                {vaccinations.length!==0 && <div className="col-md-4">
                    <p>Vaccination Chart:</p>
                    <div className="vaccinations">
                        {vaccinations.map(v => (
                        <div className="vaccination" key={v._id}>
                            <p>{v.name}</p>
                            <p>{v.datetime}</p>
                        </div>
                        ))}
                    </div>
                </div>}
                <div className="col-md-4">
                    {/* <p>Investigation Reports</p>
                    {reports.map(report => (<p>{report.title}</p>))} */}
                    <p>Last Visit</p>
                    {appointment.veterinarian && <p>Doctor's Name: {appointment.veterinarian.name}</p>}
                    <p>Reason Of Visit: {appointment.reason}</p>
                    <p>Date Of Visit: {appointment.datetime}</p>
                    {appointment.prescription && <p>Diagnosis: {appointment.prescription.diagnosis}</p>}
                    {appointment.prescription && <p>Investigations: {appointment.prescription.investigations}</p>}
                    <p>Photos</p>
                    {photos.length!==0 && photos.map(report => (<p>{report.title}</p>))}
                    {appointment.prescription && <p>Next Date Of Visit: {appointment.prescription.nextAppointment}</p>}
                </div>
            </div>}
            <h3>Investigation Reports</h3>
            <table>
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Investigation / Lab Report</th>
                        <th>File</th>
                        <th>Remarks</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length!==0 && reports.map((t,i) => (
                        <tr key={t._id}>
                            <td>{i+1}</td>
                            <td><input type="text" value={t.name}/></td>
                            <td><button type="button" onClick={() => openFile(t.path)}>{t.filename}</button></td> 
                            {/* <td><input type="text" value={t.file}/></td> */}
                            <td><input type="text" value={t.remarks}/></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
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
                            <td>{t.name}</td>
                            <td>{t.frequency}</td>
                            <td>{t.remarks}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
            {appointment && <a href={`/patient/history?id=${appointment.patient._id}&apptid=${appointment._id}`}>Go Back</a>}
       
        </div>
    )
}
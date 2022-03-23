import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import prescriptionStore from '../db/stores/prescriptions';
import patientStore from '../db/stores/patient';
import appointmentStore from '../db/stores/appointments';
import veterinarianStore from '../db/stores/veternarian';
import filesStore from '../db/stores/files';

export default function DetailedPrescription() {

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [appointment, setAppointment] = useState();
    const [reports, setReports] = useState();
    const [photos, setPhotos] = useState();

    const getData = () => {
        setAppointment(appointmentStore.getAppointment(pid));
        let temp = appointment;
        temp.veterinarian = veterinarianStore.getVeterinarian(appointment.veterinarian);
        temp.prescription = prescriptionStore.getPrescription(appointment.prescription);
        temp.patient = patientStore.getPatient(appointment.patient);
        setAppointment(temp);
        setReports(filesStore.getReports(appointment));
        setPhotos(filesStore.getPhotos(appointment));
    }

    useEffect(() => {
        localStorage.getItem("user") ? getData() : window.location.href = "/";
    }, []);

    return (
        <div className="container">
            <h1>History</h1>
            <div className="row">
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
                    <p>Doctor's Name: {appointment.veterinarian.name}</p>
                    <p>Reason Of Visit: {appointment.reason}</p>
                    <p>Date Of Visit: {appointment.datetime}</p>
                    <p>Diagnosis: {appointment.prescription.diagnosis}</p>
                    <p>Investigations: {appointment.prescription.investigations}</p>
                    <p>Treatment: {appointment.prescription.treatment}</p>
                </div>
                <div className="col-md-4">
                    <p>Investigation Reports</p>
                    {reports.map(report => (<p>{report.title}</p>))}
                    <p>Photos</p>
                    {photos.map(report => (<p>{report.title}</p>))}
                    <p>Next Date Of Visit: {appointment.prescription.nextAppointment}</p>
                </div>
            </div>
        
            <a href={`/patient/history?id=${appointment.patient._id}`}>Go Back</a>
       
        </div>
    )
}
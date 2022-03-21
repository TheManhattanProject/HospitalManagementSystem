import {useSearchParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import prescriptionStore from '../db/stores/prescriptions';
import patientStore from '../db/stores/patient';
import appointmentStore from '../db/stores/appointment';
import veterinarianStore from '../db/stores/veterinarian';
import filesStore from '../db/stores/files';

export default function DetailedPrescription() {

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [appointment, setAppointment] = useState();
    const [files, setFiles] = useState();
    setAppointment(appointmentStore.getAppointment(pid));
    let temp = appointment;
    temp.veterinarian = veterinarianStore.getVeterinarian(appointment.veterinarian);
    temp.prescription = prescriptionStore.getPrescription(appointment.prescription);
    temp.patient = patientStore.getPatient(appointment.patient);
    setAppointment(temp);
    setFiles(filesStore.getFiles(appointment));
}
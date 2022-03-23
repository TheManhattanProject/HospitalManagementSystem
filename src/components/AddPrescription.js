
import React from 'react';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import prescriptionStore from "../db/stores/prescription";
import appointmentStore from "../db/stores/appointments";
import treatmentStore from "../db/stores/treatments";   


export default function AddPrescription() {

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [treatments, setTreatments] = useState([]);
    const [treatment, setTreatment] = useState();

    useEffect(() => {
        async function getData(){
            let user = localStorage.getItem("vet");
            if (!user) {
                window.location.href = "/";
            }
            let appt = await appointmentStore.get(pid);
            let patient = await patientStore.read(appt.patient);
            setPatient(patient);
            setAppointment(appt);
        }
        getData();
    }, [pid]);
    const submittreatment = async (e) => {
        e.preventDefault();
        setTreatments([...treatments, treatment])
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            patient: patient.id,
            veterinarian: localStorage.getItem("vet"),
            nextAppointment: nextappt,
            investigation: investigation,
            diagnosis: diagnosis,

        }
        const result = await prescriptionStore.create(data);

        for (let i = 0; i < treatments.length; i++) {
            let treatment ={
                name: treatments[i].name,
                frequency: treatments[i].frequency,
                remarks : treatments[i].remarks,
                prescription: result._id
            }
            await treatmentStore.create(treatment);

    }
}

            
            

    return (
        <div>
            <h1>Add Prescription</h1>
            <form>
                <label>
                    Patient:
                    <input type="text" value={patient.name} disabled/>
                    <input type="hidden" value={patient.age} disabled/>
                    <input type="hidden" value={patient.weight} disabled/>
                </label>
                <label>
                    Treatment:
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
                            <tr>
                                <td>{treatments.length + 1}</td>
                                <td><input type="text" value={treatment.drug}/></td>
                                <td><input type="text" value={treatment.frequency}/></td>
                                <td><input type="text" value={treatment.remarks}/></td>
                                {/* <td><button onClick=()>Add</button></td> */}
                            </tr>
                        </tbody>
                    </table>

                    <input type="text" name="treatment"/>
                </label>
            </form>
        </div>


                

    )

}

import React from 'react';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import fileStore from "../db/stores/files";
import prescriptionStore from "../db/stores/prescription";
import appointmentStore from "../db/stores/appointments";
import treatmentStore from "../db/stores/treatments";   
import Creatable from 'react-select/creatable';
const {dialog} = window.require('electron').remote;


export default function AddPrescription() {

    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [oldTreatments, setOldTreatments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [treatment, setTreatment] = useState();
    const [nextappt, setNextapp] = useState("");
    const [investigations, setInvestigations] = useState([]);
    const [diagnosis, setDiagnosis] = useState("");
    const [treatmentOptions, setTreatmentOptions] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [remark, setRemark] = useState("");



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
            setOldTreatments(await treatmentStore.readAll());
        }
        getData();
    }, [pid]);

    useEffect(() => {
        let temp = []
        oldTreatments.forEach(treatment => {
            temp.push({value: treatment._id, label: treatment.name})
        })
        setTreatmentOptions(temp);
    }, [oldTreatments])
    const submittreatment = async (e) => {
        e.preventDefault();
        setTreatments([...treatments, treatment])
    }
  

    function savefile() {

     dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections']
    }, function (file) {
        if (file !== undefined) {
            let temp = {
                title: file[0].split("\\").pop(),
                path: file[0],
                appointment: appointment._id,
                category: "report",
                remarks: remark         
         }

            setFiles([...files, temp]);
        }            
    }
    )}
    function saveimage() {

        dialog.showOpenDialog({
           properties: ['openFile', 'multiSelections']
       }, function (file) {
           if (file !== undefined) {
            let temp = {
                title: file[0].split("\\").pop(),
                path: file[0],
                appointment: appointment._id,
                category: "image",
                remarks: remark         
            }

            setImages([...images, temp]);
           }            
       }
       )}

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            patient: patient.id,
            veterinarian: localStorage.getItem("vet"),
            nextAppointment: nextappt,
            investigation: investigations,
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
     for (let i = 0; i < files.length; i++) {
         const result = await fileStore.create(files[i]);
       }
     for (let i = 0; i < images.length; i++) {
        const image_result = await fileStore.create(images[i]);
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

                <p>Investigations:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Remarks</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {treatments.length!==0 && treatments.map((t,i) => (
                            <tr key={t._id}>
                                <td>{i+1}</td>
                                <td><input type="text" value={t.name}/></td>
                                <td><input type="text" value={t.frequency}/></td>
                                <td><input type="text" value={t.remarks}/></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{treatments.length + 1}</td>
                            <td><input type="text" value={treatment.name}/></td>
                            <td><input type="text" value={treatment.frequency}/></td>
                            <td><input type="text" value={treatment.remarks}/></td>
                            {/* <td><button onClick=()>Add</button></td> */}
                        </tr>
                        
                    </tbody>
                </table>


                <p>Treatment:</p>
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
                                <td><input type="text" value={t.name}/></td>
                                <td><input type="text" value={t.frequency}/></td>
                                <td><input type="text" value={t.remarks}/></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{treatments.length + 1}</td>
                            <td><input type="text" value={treatment.name}/></td>
                            <td><input type="text" value={treatment.frequency}/></td>
                            <td><input type="text" value={treatment.remarks}/></td>
                            {/* <td><button onClick=()>Add</button></td> */}
                        </tr>

                    </tbody>
                </table>
            </form>
        </div>


                

    )

}
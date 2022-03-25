
import React from 'react';
import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import fileStore from "../db/stores/files";
import prescriptionStore from "../db/stores/prescriptions";
import appointmentStore from "../db/stores/appointments";
import treatmentStore from "../db/stores/treatment";   
import investigationStore from "../db/stores/investigation";
import Creatable from 'react-select/creatable';
import InventoryStore from "../db/stores/inventory";
import { Navigate } from 'react-router-dom';
// const {dialog} = window.require('electron').remote;



export default function AddPrescription() {

    const [redirect, setRedirect] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [oldTreatments, setOldTreatments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [treatmentname, setTreatmentname] = useState("");
    const [treatmentfrequency, setTreatmentfrequency] = useState("");
    const [treatmentremarks, setTreatmentremarks] = useState("");
    const [investigationremarks, setInvestigationremarks] = useState("");
    const [investigationname, setInvestigationname] = useState("");
    const [investigationfilename, setInvestigationfilename] = useState("");

    const [investigationpath, setInvestigationpath] = useState("");


    const [nextappt, setNextapp] = useState("");
    const [investigations, setInvestigations] = useState([]);
    const [diagnosis, setDiagnosis] = useState("");
    const [treatmentOptions, setTreatmentOptions] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [remark, setRemark] = useState("");
    const [inventory, setInventory] = useState([]);



    useEffect(() => {
        async function getData(){
            let user = localStorage.getItem("vet");
            if (!user) {
                setRedirect("/vet/login")
            }
            let appt = await appointmentStore.read(pid);
            let patient = await patientStore.read(appt.patient);
            setPatient(patient);
            setAppointment(appt);
            setOldTreatments(await treatmentStore.readAll());
            setInventory(await InventoryStore.readAll());

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
        let treatment = {
            name: treatmentname,
            frequency: treatmentfrequency,
            remarks: treatmentremarks
        }
        setTreatments([...treatments, treatment])
    }
  

    function savefile() {
        let file ={
            name: investigationname,
            path: investigationpath,
            filename: investigationfilename,
            remarks: investigationremarks
        }
        setFiles([...files, file])
    }

    //  dialog.showOpenDialog({
    //     properties: ['openFile']
    // }, function (file) {
    //     if (file !== undefined) {
    //         let temp = {
    //             name: investigationname,
    //             path: file[0],
    //             remarks: investigationremarks        
    //      }

    //         setFiles([...files, temp]);
    //     }            
    // }

    function removefile(index) {
        let temp = [...files];
        temp.splice(index, 1);
        setFiles(temp);
    }
    function fileset(e){
        setInvestigationfilename(e.name);
        setInvestigationpath(e.path);
    }

    // function saveimage() {

    //     dialog.showOpenDialog({
    //        properties: ['openFile', 'multiSelections']
    //    }, function (file) {
    //        if (file !== undefined) {
    //         let temp = {
    //             title: file[0].split("\\").pop(),
    //             path: file[0],
    //             appointment: appointment._id,
    //             category: "image",
    //             remarks: remark         
    //         }

    //         setImages([...images, temp]);
    //        }            
    //    }
    //    )}

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            patient: patient._id,
            veterinarian: localStorage.getItem("vet"),
            nextAppointment: nextappt,
            diagnosis: diagnosis,
        }
        const result = await prescriptionStore.create(data);
        const res = await appointmentStore.update(appointment._id, {prescription: result._id});
        console.log(result);
        console.log(res);
        console.log(await appointmentStore.read(appointment._id));

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
            files[i].prescription = result._id;
            const fileres = await investigationStore.create(files[i]);
        }
        for (let i = 0; i < images.length; i++) {
            images[i].prescription = result._id;
            const image_result = await fileStore.create(images[i]);
        }

        console.log(await investigationStore.readAll())

        // window.location.href = `/patient/history?id=${patient._id}&apptid=${appointment._id}`;
        setRedirect(`/patient/history?id=${patient._id}&apptid=${appointment._id}`);

    }
    function removetreatment(i){
        let temp = [...treatments];
        temp.splice(i, 1);
        setTreatments(temp);
        
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }        

    return (
        <div>
            <h1>Add Prescription</h1>
            <form>
               {patient && <label>
                    Patient:
                    <input type="text" value={patient.name} disabled/>
                    <input type="hidden" value={patient.age} disabled/>
                    <input type="hidden" value={patient.weight} disabled/>
                </label>}

                <p>Investigations:</p>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Investigation / Lab Report</th>
                            <th>Add File</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.length!==0 && files.map((t,i) => (
                            <tr key={t._id}>
                                <td>{i+1}</td>
                                <td><input type="text" value={t.name} disabled/></td>
                                <td><p>{t.filename}</p></td>
                                <td><input type="text" value={t.remarks} disabled/></td>
                                <td><button type="button" onClick={() => removefile(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{files.length + 1}</td>
                            <td><input type="text" value={investigationname} onChange = {e => {setInvestigationname(e.target.value)}}/></td>
                            <td><input type="file" onChange={e=>{fileset(e.target.files[0])}}/></td>
                            <td><input type="text" value={investigationremarks} onChange = {e=>{setInvestigationremarks(e.target.value)}}/></td>
                            <td><button type="button" onClick={savefile}>Add</button></td>
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
                                <td><input type="text" value={t.name} disabled/> </td>
                                <td><input type="text" value={t.frequency} disabled/></td>
                                <td><input type="text" value={t.remarks} disabled/></td>
                                <td><button type="button" onClick={() => removetreatment(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{treatments.length + 1}</td>
                            <td><input type="text" value={treatmentname} onChange={e=>{setTreatmentname(e.target.value)}}/></td>
                            <td><input type="text" value={treatmentfrequency} onChange = {e=>{setTreatmentfrequency(e.target.value)}}/></td>
                            <td><input type="text" value={treatmentremarks} onChange = {e=>{setTreatmentremarks(e.target.value)}}/></td>
                            <td><button type="button" onClick={submittreatment}>Add</button></td>
                        </tr>

                        
                    </tbody>
                </table>
                <input type="text" value={diagnosis} onChange = {e=>{setDiagnosis(e.target.value)}}/>
                <input type="datetime-local" value={nextappt} onChange = {e=>{setNextapp(e.target.value)}}/>
                <p>Upload Photos (If any)</p>
                
                <button onClick={handleSubmit}>Submit</button>

            </form>
            {patient && appointment && <button type="button" onClick={() => setRedirect(`/patient/history?id=${patient._id}&apptid=${appointment._id}`)}>Back</button>}
        </div>          
    )
}
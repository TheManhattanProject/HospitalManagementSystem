
import React from 'react';
import {useEffect, useState, useRef} from 'react';
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
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
const { dialog, BrowserWindow } = window.require('electron').remote
// const {dialog} = window.require('electron').remote;



export default function AddPrescription() {

    const [redirect, setRedirect] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    const [oldTreatments, setOldTreatments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    // const [treatmentname, setTreatmentname] = useState("");
    const treatmentname = useRef();
    // const [treatmentfrequency, setTreatmentfrequency] = useState("");
    const treatmentfrequency = useRef();
    // const [treatmentremarks, setTreatmentremarks] = useState("");
    const treatmentremarks = useRef();
    // const [investigationremarks, setInvestigationremarks] = useState("");
    const investigationremarks = useRef();
    // const [investigationname, setInvestigationname] = useState("");
    const investigationname = useRef();
    const [investigationfilename, setInvestigationfilename] = useState("");
    const [investigationpath, setInvestigationpath] = useState("");
    // const investigationpath = useRef();


    // const [nextappt, setNextapp] = useState("");
    const nextappt = useRef();
    const [investigations, setInvestigations] = useState([]);
    // const [diagnosis, setDiagnosis] = useState("");
    const diagnosis = useRef();
    const [treatmentOptions, setTreatmentOptions] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    // const [remark, setRemark] = useState("");
    const remark = useRef();
    const [inventory, setInventory] = useState([]);

    const alertbox = (m) => {
        const window = BrowserWindow.getFocusedWindow();
        dialog.showMessageBox(window, {
          title: '  Alert',
          buttons: ['Dismiss'],
          type: 'warning',
          message: m,
        });
      }

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
            name: treatmentname.current.value,
            frequency: treatmentfrequency.current.value,
            remarks: treatmentremarks.current.value
        }
        setTreatments([...treatments, treatment])
    }
  

    function savefile() {
        let file ={
            name: investigationname.current.value,
            path: investigationpath,
            filename: investigationfilename,
            remarks: investigationremarks.current.value
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
        <div className="outer">
            <div className="lheader">
                {patient && appointment && <div onClick={()=>{setRedirect(`/patient/history?id=${patient._id}&apptid=${appointment._id}`)}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>}
                <Header />
            </div>
            <div className="lout">
                <Sidebar currentTab={100}/>
            <div className="cont-out">
            <h1>Add Prescription</h1>
            <div className="cont-in">
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
                            <td><input type="text" ref={investigationname} /></td>
                            <td><input type="file" onChange={e=>{fileset(e.target.files[0])}}/></td>
                            <td><input type="text" ref={investigationremarks}/></td>
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
                            <td><input type="text" ref={treatmentname} /></td>
                            <td><input type="text" ref={treatmentfrequency} /></td>
                            <td><input type="text" ref={treatmentremarks}/></td>
                            <td><button type="button" onClick={submittreatment}>Add</button></td>
                        </tr>

                        
                    </tbody>
                </table>
                <input type="text" ref={diagnosis} />
                <input type="text" ref={nextappt} onFocus={e => e.target.type = "datetime-local"}/>
                <p>Upload Photos (If any)</p>
                
                <button onClick={handleSubmit}>Submit</button>

            </form>
            {/* {patient && appointment && <button type="button" onClick={() => setRedirect(`/patient/history?id=${patient._id}&apptid=${appointment._id}`)}>Back</button>} */}
        </div> 
        </div> 
        </div>  
        </div>      
    )
}
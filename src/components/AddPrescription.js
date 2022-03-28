
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
import './styles/Addprescription.css';
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
    const [treatmentname, setTreatmentname] = useState();
    // const treatmentname = useRef();
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
    const imagetitle= useRef();
    const [imagepath, setImagepath] = useState("");
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
            name: treatmentname.label,
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
    function saveimage() {
        let image ={
            title: imagetitle.current.value,
            path: imagepath
        }
        setImages([...images, image])
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
    function removeimage(i){
        let temp = [...images];
        temp.splice(i, 1);
        setImages(temp);

    }
    function fileset(e){
        if (e && e.path && e.name){
            setInvestigationfilename(e.name);
            setInvestigationpath(e.path);
        }
    }
    function imageset(e){
        if(e && e.path){
            setImagepath(e.path);
        }
       

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

    function handleCreate(input) {
        setTreatmentname({value: input, label: input});
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
               {patient && <div className='patient-details'>
                    <div className='patient-details-left'>
                    <p className='pet-details'>Name :</p>
                    <input type="text" value={patient.name} disabled/>
                    </div>

                    <div className='patient-details-left'>
                    <p className='pet-details'>Age :</p>
                    <input type="text" value={patient.age} disabled/>
                    </div>

                    <div className='patient-details-left'>
                    <p className='pet-details'>Weight :</p>
                    <input type="text" value={patient.bodyweight} disabled/>
                    </div>

                    <div className='patient-details-left'>
                    <p className='pet-details'>Sex :</p>
                    <input type="text" value={patient.sex} disabled/>
                    </div>
                </div>}

                <div className='next-appt'>
                    <p className='sub-heading'>Appointment Details:</p>
                    <div className="patient-details">
                    <div className='patient-details-left'>
                    <p className='pet-details'>Diagnosis :</p>
                    <input className="next-appt-inp" placeholder="Diagnosis" type="text" ref={diagnosis} />
                    </div>
                    <div className='patient-details-left'>
                    <p className='pet-details'>Next Appointment :</p>
                    <input type="text" className="next-appt-inp" ref={nextappt} onFocus={e => e.target.type = "datetime-local"}/>
                    </div>
                    </div>
                </div>

                <div className="investigations-div">
                <p className='sub-heading'>Investigations:</p>
                <table>
                    <thead>
                        <tr>
                            <th className='td-1'>Sl No.</th>
                            <th className='td-2'>Investigation / Lab Report</th>
                            <th className='td-3'>Add File</th>
                            <th className='td-4'>Remarks</th>
                            <th className='td-5'></th>
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
                </div>

                <div className="investigations-div">
                <p className='sub-heading'>Treatment:</p>
                <table>
                    <thead>
                        <tr>
                            <th className="td-1">Sl No.</th>
                            <th className="td-2">Drug Name /Treatment</th>
                            <th className="td-3">Frequency</th>
                            <th className="td-4">Remarks</th>
                            <th className="td-5"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatments.length!==0 && treatments.map((t,i) => (
                            <tr key={t._id}>
                                <td className="td-1">{i+1}</td>
                                <td className="td-2"><input type="text" value={t.name} disabled/> </td>
                                <td className="td-3"><input type="text" value={t.frequency} disabled/></td>
                                <td className="td-4"><input type="text" value={t.remarks} disabled/></td>
                                <td className="td-5"><button type="button" onClick={() => removetreatment(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{treatments.length + 1}</td>
                            {/* <td><input type="text" ref={treatmentname} /></td> */}
                            <td><Creatable 
                                value={treatmentname}
                                options={oldTreatments}
                                onChange={setTreatmentname}
                                onCreateOption={handleCreate}

                            /></td>
                            <td><input type="text" ref={treatmentfrequency} /></td>
                            <td><input type="text" ref={treatmentremarks}/></td>
                            <td><button type="button" onClick={submittreatment}>Add</button></td>
                        </tr>

                    </tbody>
                </table>
                </div>
                
                <div className='investigations-div'>
                <p className='sub-heading'>Upload Photos (If any)</p>
                <table>
                <thead>
                        <tr>
                            <th className='td2-1'>Sl No.</th>
                            <th className='td2-2'>Image Name</th>
                            <th className='td2-3'>Investigation Image</th>
                            <th className='td2-4'></th>
                        </tr>
                    </thead>
                <tbody>
                        {images.length!==0 && images.map((t,i) => (
                            <tr key={t._id}>
                                <td>{i+1}</td>
                                <td><input type="text" value={t.title} disabled/></td>
                                <td><p>{t.path}</p></td>
                                <td><button type="button" onClick={() => removeimage(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{images.length + 1}</td>
                            <td><input type="text" ref={imagetitle} /></td>
                            <td><input type="file" accept=".jpg,.jpeg,.png,.svg" onChange={e=>{imageset(e.target.files[0])}}/></td>
                            {/* <td><input type="text" ref={imageremarks}/></td> */}
                            <td><button type="button" onClick={saveimage}>Add</button></td>
                        </tr>
                        
                    </tbody>
                </table>
                </div>
                
                <button className='button-end last-btn' onClick={handleSubmit}>Submit</button>

            </form>
            {/* {patient && appointment && <button type="button" onClick={() => setRedirect(`/patient/history?id=${patient._id}&apptid=${appointment._id}`)}>Back</button>} */}
        </div> 
        </div> 
        </div>  
        </div>      
    )
}
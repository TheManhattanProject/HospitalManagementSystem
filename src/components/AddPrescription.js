
import React from 'react';
import {useEffect, useState, useRef} from 'react';
import {useSearchParams} from 'react-router-dom';
import patientStore from "../db/stores/patient";
import fileStore from "../db/stores/files";
import prescriptionStore from "../db/stores/prescriptions";
import appointmentStore from "../db/stores/appointments";
import treatmentStore from "../db/stores/treatment";   
import investigationStore from "../db/stores/investigation";
import vitalStore from "../db/stores/vitals";
import Creatable from 'react-select/creatable';
import InventoryStore from "../db/stores/inventory";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
import './styles/Addprescription.css';
const { dialog, BrowserWindow } = window.require('electron').remote


// const {dialog} = window.require('electron').remote;



export default function AddPrescription() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pid = searchParams.get("id");
    const [patient, setPatient] = useState();
    const [appointment, setAppointment] = useState();
    // const [oldTreatments, setOldTreatments] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [treatmentname, setTreatmentname] = useState();
    // const treatmentname = useRef();
    // const [treatmentfrequency, setTreatmentfrequency] = useState("");
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
    // const [diagnosis, setDiagnosis] = useState("");
    const diagnosis = useRef();
    const [treatmentOptions, setTreatmentOptions] = useState([]);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const vitalsName=useRef();
    const vitalsValue=useRef()
    const vitalsRemark=useRef();
    const [vitals,setVitals]=useState([]);
    const commentValue=useRef();
    const [comments,setComments]=useState([]);
    const imagetitle= useRef();
    const [imagepath, setImagepath] = useState("");
    const [imagefilename, setImagefilename] = useState("");
    // const [remark, setRemark] = useState("");
    // const remark = useRef();
    const [inventory, setInventory] = useState([]);
    const days = useRef();
    const morn = useRef();
    const noon = useRef();
    const night = useRef();

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
                navigate("/vet/login")
            }
            let appt = await appointmentStore.read(pid);
            let patient = await patientStore.read(appt.patient);
            setPatient(patient);
            setAppointment(appt);
            // setOldTreatments(await treatmentStore.readAll());
            setInventory(await InventoryStore.readAll());

        }
        getData();
    }, [pid]);

    useEffect(() => {
        let temp = []
        inventory.forEach(treatment => {
            temp.push({value: treatment._id, label: treatment.name})
        })
        
        setTreatmentOptions(temp);
    }, [inventory])
    
    const submittreatment = async (e) => {
        if(!treatmentname || !treatmentname.label || !treatmentname.value || !treatmentremarks.current.value || !days.current.value || (!morn.current.checked && !noon.current.checked && !night.current.checked)){
            alertbox("Please fill the inomplete fields");
            return;
        }
        
        // let freq="1"
        let freq = (morn.current.checked ? "1" : "0") + (noon.current.checked ? "1" : "0") + (night.current.checked ? "1" : "0");
        let inhouse = null;
        if (treatmentname.label !== treatmentname.value) {
            let n = Number(freq[0]) + Number(freq[1]) + Number(freq[2]);
            let item = await InventoryStore.read(treatmentname.value);
            if(item.quantity < n*days.current.value) {
                alertbox("Not enough quantity in inventory. Kindly Purchase from outside.");
            } else {
                console.log(item,n*days.current.value);
                console.log(await InventoryStore.readAll())
                await InventoryStore.updateQty(treatmentname.value, -n*days.current.value);
                inhouse = treatmentname.value;
            }
        }

        e.preventDefault();
        let treatment = {
            name: treatmentname.label,
            frequency: freq,
            remarks: treatmentremarks.current.value,
            inhouse: inhouse,
            days:days.current.value,

        }
        console.log(treatment);
        setTreatments((prev)=>{return [...prev,treatment]});
    }
  

    function savefile() {
        let file ={
            name: investigationname.current.value,
            path: investigationpath,
            filename: investigationfilename,
            remarks: investigationremarks.current.value
        }

        setFiles((prev)=>{return [...prev, file]});
        setInvestigationfilename("");
        setInvestigationpath("")
       
    }
    function saveimage() {
        if (!imagetitle.current.value || !imagepath) {
            alertbox("Please fill all the fields for the image");
            return;
        }
        let image ={
            title: imagetitle.current.value,
            path: imagepath,
            filename: imagefilename
        }
        setImages((prev)=>{return [...prev,image]});
        setImagefilename("");
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
            setImagefilename(e.name);
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
        if( !diagnosis.current.value || !nextappt.current.value ){
            alertbox("Please fill all the fields");
            return;
        }
        let data = {
            patient: patient._id,
            veternarian: localStorage.getItem("vet"),
            nextAppointment: nextappt.current.value,
            diagnosis: diagnosis.current.value,
        }
        const result = await prescriptionStore.create(data);
        // const result = {_id: "0"}
        const res = await appointmentStore.update(appointment._id, {prescription: result._id});
        console.log(await appointmentStore.read(appointment._id));

        for (let i = 0; i < treatments.length; i++) {
            let treatment ={
                name: treatments[i].name,
                frequency: treatments[i].frequency,
                remarks : treatments[i].remarks,
                days: treatments[i].days,
                inhouse: treatments[i].inhouse,
                prescription: result._id
            }
            await treatmentStore.create(treatment);

        }
        for (let i = 0; i < files.length; i++) {
            let tempFiles=files[i]
            tempFiles.prescription = result._id;
            const fileres = await investigationStore.create(tempFiles);
        }
        for (let i = 0; i < images.length; i++) {
            let tempImages=images[i]
            tempImages.prescription = result._id;
            const image_result = await fileStore.create(tempImages);
        }

        for (let i = 0; i < vitals.length; i++) {
            let tempVitals=vitals[i]
            tempVitals.prescription = result._id;
            const vital_result = await vitalStore.create(tempVitals);
        }

        console.log(await investigationStore.readAll())

        // window.location.href = `/patient/history?id=${patient._id}&apptid=${appointment._id}`;
        navigate(`/patient/history?id=${patient._id}&apptid=${appointment._id}`);

    }
    async function removetreatment(i){
        
        let inv = treatments[i];
        console.log(inv, inv.inhouse);
        if(inv.inhouse){
            console.log(inv.inhouse);
            console.log(inv.days);
            console.log(Number(inv.frequency[0])+Number(inv.frequency[1])+Number(inv.frequency[2]));
            await InventoryStore.updateQty(inv.inhouse, inv.days*(Number(inv.frequency[0])+Number(inv.frequency[1])+Number(inv.frequency[2])));
        }
        let temp = [...treatments];
        temp.splice(i, 1);
        setTreatments(temp);
        
    }

    function handleCreate(input) {
        setTreatmentname({value: input, label: input});
    }


    function createVitals(){
        let temp = {
            vName:vitalsName.current.value,
            vValue:vitalsValue.current.value,
            vRemark:vitalsRemark.current.value,
        }

        setVitals((prev)=>{return [...prev,temp]});
        
    }

    function removeVitals(index) {

        setVitals((prev)=>{
            let temp = [...prev];
            temp.splice(index, 1);

            return temp;
        });
    }


    function createComments(){
        let temp = {
            remarks:commentValue.current.value,
        }

        setComments((prev)=>{return [...prev,temp]});
        
    }

    function removeComments(index) {

        setComments((prev)=>{
            let temp = [...prev];
            temp.splice(index, 1);

            return temp;
        });
    }


    return (
        <div className="outer">
            <div className="lheader">
                {patient && appointment && <div onClick={()=>{navigate(`/patient/history?id=${patient._id}&apptid=${appointment._id}`)}} className='back-div'>
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
                    <p className='pet-details'>Name</p>
                    <input type="text" value={patient.name} disabled/>
                    </div>

                    <div className='patient-details-left'>
                    <p className='pet-details'>Age</p>
                    <input type="text" value={patient.age} disabled/>
                    </div>

                    <div className='patient-details-left'>
                    <p className='pet-details'>Weight</p>
                    <input type="text" value={patient.bodyweight} disabled/>
                    </div>

                    <div className='patient-details-left'>
                    <p className='pet-details'>Sex</p>
                    <input type="text" value={patient.sex} disabled/>
                    </div>
                </div>}

                <div className='next-appt'>
                    <p className='sub-heading'>Appointment Details:</p>
                    <div className="patient-details">
                    <div className='patient-details-left'>
                    <p className='pet-details'>Diagnosis :</p>
                    <input className="next-appt-inp" placeholder="Diagnosis" type="text" ref={diagnosis} required/>
                    </div>
                    <div className='patient-details-left'>
                    <p className='pet-details'>Next Appointment :</p>
                    <input type="text" className="next-appt-inp" ref={nextappt} onFocus={e => e.target.type = "datetime-local"} required/>
                    </div>
                    </div>
                </div>
                <div className="investigations-div">
                <p className='sub-heading'>Vitals:</p>
                <table>
                    <thead>
                        <tr>
                            <th className='td-1'>Sl No.</th>
                            <th className='td-2'>Name</th>
                            <th className='td-3'>Value</th>
                            <th className='td-4'>Remarks</th>
                            <th className='td-5'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {vitals.length!==0 && vitals.map((t,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><p>{t.vName}</p></td>
                                <td><p>{t.vValue}</p></td>
                                <td><p>{t.vRemark}</p></td>
                                <td><button type="button" onClick={() => removeVitals(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{vitals.length + 1}</td>
                            <td><input type="text" ref={vitalsName} /></td>
                            <td><input type="text" ref={vitalsValue}/></td>
                            <td><input type="text" ref={vitalsRemark}/></td>
                            <td><button type="button" onClick={createVitals}>Add</button></td>
                        </tr>
                        
                    </tbody>
                </table>
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
                            <tr key={i}>
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
                            <th className="td1-1">Sl No.</th>
                            <th className="td1-2">Drug Name /Treatment</th>
                            <th className="td1-3">Frequency</th>
                            <th className='td1-4'>Days</th>
                            <th className="td1-5">Remarks</th>
                            <th className="td1-6"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatments.length!==0 && treatments.map((t,i) => (
                            <tr key={i}>
                                <td className="td1-1">{i+1}</td>
                                <td className="td1-2"><input type="text" value={t.name} disabled/> </td>
                                <td className="td1-3">
                                    <div className='radio-inp'>
                                        <div className='freq-div'>
                                            <label>Morning</label>
                                            {t.frequency[0]==="1" ? <input type="checkbox" checked="checked" disabled/> : <input type="checkbox" disabled/>}
                                        </div>
                                        <div className='freq-div'>
                                            <label>Afternoon</label>
                                            {t.frequency[1]==="1" ? <input type="checkbox" checked="checked" disabled/> : <input type="checkbox" disabled/>}
                                        </div>
                                        <div className='freq-div'>
                                            <label>Night</label>
                                            {t.frequency[2]==="1" ? <input type="checkbox" checked="checked" disabled/> : <input type="checkbox" disabled/>}
                                        </div>
                                    </div>
                                </td>
                                <td className="td1-4"><input type="number" value={t.days} disabled /></td>
                                <td className="td1-5"><input type="text" value={t.remarks} disabled/></td>
                                <td className="td1-6"><button type="button" onClick={() => removetreatment(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{treatments.length + 1}</td>
                            {/* <td><input type="text" ref={treatmentname} /></td> */}
                            <td><Creatable 
                                value={treatmentname}
                                options={treatmentOptions}
                                onChange={setTreatmentname}
                                onCreateOption={handleCreate}

                            /></td>
                             <td>
                             <div className='radio-inp'>
                            <div className='freq-div'>
                                <label>Morning</label>
                                <input type="checkbox" name="Morning" ref={morn} />
                            </div>
                            <div className='freq-div'>
                                <label>Afternoon</label>
                                <input type="checkbox" name="Afternoon" ref={noon} />
                            </div>
                            <div className='freq-div'>
                                <label>Night</label>
                                <input type="checkbox" name="Night" ref={night} />
                            </div>
                            </div>
                            
                            </td>
                            <td><input type="number" ref={days}/></td>
                            <td><input type="text" ref={treatmentremarks} /></td>
                           
                            <td><button type="button" onClick={submittreatment}>Add</button></td>
                        </tr>

                    </tbody>
                </table>
                </div>
                <div className="investigations-div">
                <p className='sub-heading'>Additional Remarks:</p>
                <table>
                    <thead>
                        <tr>
                            <th className='td-1'>Sl No.</th>
                            <th className='td-2'>Comments</th>
                            <th className='td-5'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length!==0 && comments.map((t,i) => (
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td><p>{t.remarks}</p></td>
                                <td><button type="button" onClick={() => removeComments(i)}>Remove</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td>{comments.length + 1}</td>
                            <td><input type="text" ref={commentValue} /></td>
                            <td><button type="button" onClick={createComments}>Add</button></td>
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
            {/* {patient && appointment && <button type="button" onClick={() => navigate(`/patient/history?id=${patient._id}&apptid=${appointment._id}`)}>Back</button>} */}
        </div> 
        </div> 
        </div>  
        </div>      
    )
}
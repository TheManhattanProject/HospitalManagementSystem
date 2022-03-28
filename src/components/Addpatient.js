import React from 'react';
import patientStore from '../db/stores/patient';
import vaccineStore from '../db/stores/vaccine';
import {useState,useEffect, useRef} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles/Addpatient.css'
import backIcon from "../assets/arrow.png"
const { dialog, BrowserWindow } = window.require('electron').remote
// import VaccinationForm from './VaccinationForm'

export default function Addpatient() {
  const [owner, setOwner] = useState('');
  const [redirect, setRedirect] = useState();

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
    const owner = localStorage.getItem("user");
    if (owner) {
        setOwner(owner);
    }
    else {
        // window.location.href = "/";
        setRedirect("/login")
    }
    }, []);

//   const [name, setName] = useState("");
    const name = useRef();
//   const [age, setAge] = useState("");
    const age = useRef();
//   const [sex, setSex] = useState("");
    const sex = useRef();
//   const [species, setSpecies] = useState("");
    const species = useRef();
//   const [bodyweight, setBodyweight] = useState("");
    const bodyweight = useRef();
//   const [color, setColor] = useState("");
    const color = useRef();
//   const [fertility, setFertility] = useState("");
    const fertility = useRef();
//   const [health, setHealth] = useState("");
  const [vaccinations, setVaccinations] = useState([]);
//   const [vaccineName, setVaccineName] = useState("");
    const vaccineName = useRef();
//   const [vaccineDate, setVaccineDate] = useState();
    const vaccineDate = useRef();
  const [profile, setProfile]=useState("");
    // const profile = useRef();

  const [open, setOpen] = useState(false);  
  const closeModal = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!sex.current.value) {
            alertbox("Please select the pet's gender")
        }

        const patient = {
            name: name.current.value,
            age: age.current.value,
            sex: sex.current.value, 
            species: species.current.value,
            color:color.current.value,
            fertility: fertility.current.value,
            bodyweight:bodyweight.current.value,
            owner: owner,
            profile : profile
        }

        console.log(patient);

        let result = await patientStore.create(patient);

            
        for (let i = 0; i < vaccinations.length; i++) {
            const vaccination = {
                name: vaccinations[i].name,
                datetime: vaccinations[i].datetime,
                patient: result._id
            }

            await vaccineStore.create(vaccination);
        }
        //  window.location.href = "/dashboard";
        setRedirect("/dashboard");
    }

    const addVaccine = () => {
        let formattedDate = new Date(vaccineDate.current.value);
        const temp = {
            name: vaccineName.current.value,
            datetime: formattedDate.toLocaleDateString(),
        }
        setVaccinations([...vaccinations, temp])
        setOpen(false);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    function fileclick(e){
        setProfile(e.target.files[0].path)
    }
    function removevaccine(i){
        const temp = [...vaccinations];
        temp.splice(i, 1);
        setVaccinations(temp);
    }

    return (
        <div className="outer">
            <div className="lheader">
                <div onClick={()=>{setRedirect("/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>
                <Header />
            </div>
        <div className="lout">
            <Sidebar currentTab={100}/>
        <div className="cont-out">
            <h1>New Pet Registration</h1>
            <div className="cont-in">
            <form onSubmit={handleSubmit}>  
                <div className="formall">
                    <div className="first">
                        {/* {!profile && <div className="withoutimg">
                            <input id ="fileselect" type="file" onChange={(e)=>{fileclick(e)}}/>
                            <p>Add Photo</p>
                        </div>}
                        {profile && <div className="withimg">
                            <img src={`file://${profile}`} alt="profile"></img>
                        </div>} */}
                        {!profile && <input id ="fileselect" type="file" accept=".jpg,.jpeg,.png,.svg" onChange={(e)=>{fileclick(e)}}/>}
                        {profile!=="" && <img src={`file://${profile}`} alt="profile" className="profile-upload"></img>}
                        {profile==="" && <p className='bold-text'>Add Photo</p>}
                        {profile!=="" && <p>{profile.substring(Math.max(profile.lastIndexOf("/")+1,profile.lastIndexOf("\\")+1),profile.length)} <span onClick={()=>{setProfile("")}}>X</span></p>}
                    </div>


                    <div className="second">
                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text" className="form-control" placeholder="Name" ref={name} />
                        </div>
                        <div className="form-group">
                            <label>Age :</label>
                            <input type="number" className="form-control" placeholder="Age" ref={age} />
                        </div>
                        <div className="form-group">
                            <label>Species :</label>
                            <input type="text" className="form-control" ref={species} placeholder="Species" />
                        </div>
                        <div className="form-group">
                            <label>Sex : </label>
                                <select name="gender" id="cars" ref={sex}>
                                <option value="" selected disabled hidden>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                {/* <option value="Non Binary">Non-Binary</option> */}
                                </select> 
                        </div>
                        <div className="form-group">
                            <label>Body Weight(in Kgs) :</label>
                            <input type="number" className="form-control" placeholder="Body Weight" ref={bodyweight} />
                        </div>
                        <div className="form-group">
                            <label>Body Color :</label>
                            <input type="text" className="form-control" placeholder="Body Color" ref={color} />
                        </div>
                        {/* <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" placeholder="Health" ref={health} onChange={e => setHealth(e.target.value)} />
                        </div> */}
                    </div>

                    <div className="third">
                        <div className="form-group">
                            <label>Fertility : </label>
                            <input type="radio" id="fertility-yes" name="fertility-radio" value="yes" ref={fertility}/>
                            <label for="fertility-yes">Yes</label>
                            <input type="radio" id="fertility-no" name="fertility-radio" value="no" ref={fertility}/>
                            <label for="fertility-no">No</label>
                            {/* <input type="text" className="form-control" value={fertility} onChange={e => setFertility(e.target.value)} /> */}
                        </div>

                        <p className="sub-heading">Vaccination Chart</p>
                        <div className="vaccinations">
                            {vaccinations.length!==0 && vaccinations.map((vaccination, i)=> (
                                <div className="vaccinationCard" key={vaccination._id}>
                                    <p className="bold-text">{vaccination.name}</p>
                                    <p className="bold-text">{vaccination.datetime}</p>
                                    <p className="bold-text clickable-div" onClick={()=>removevaccine(i)}>x</p>
                                </div>
                            ))}
                            <div className="vaccinationCard clickable-div" onClick={() => setOpen(o => !o)}>
                                <p>Add More</p>
                                <p className="bold-text plus-symbol">+</p>
                            </div>
                            {/* <button type="button" className="button button-end" onClick={() => setOpen(o => !o)}>Add Vaccine</button> */}
                            <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
                                <div className="popup-container">
                                <div className="popup-btn-container">
                                    <p>Vaccination Form</p>
                                    <button className="close" onClick={closeModal}>  &times;  </button>
                                </div>
                                    <div className="popup-form">
                                        <div className="popup-form-group">
                                            <label>Vaccine Name :</label>
                                            <input type="text" className="popup-form-control" placeholder="Vaccine name" ref={vaccineName} />
                                        </div>
                                        <div className="popup-form-group">
                                            <label>Vaccine Date :</label>
                                            <input type="text" className="popup-form-control" placeholder='Date of Vaccinations' onFocus={e => e.target.type="date"} ref={vaccineDate}/>
                                            {/* <input type="date" className="popup-form-control" value={vaccineDate} onChange={e => setVaccineDate(e.target.value)} /> */}
                                        </div>
                                    </div>
                                    <button type="button" onClick ={addVaccine} className="popup-form-btn">Add</button>
                                </div>
                            </Popup>
                    </div>
                    </div>

                </div>
                <div className="submit-div">
                <button type="submit" className="submit-btn">Submit</button>
                </div>
                {/* <button type="button" onClick={() => setRedirect("/dashboard")}>Go Back</button> */}
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}

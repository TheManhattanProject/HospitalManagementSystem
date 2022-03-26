import React from 'react';
import patientStore from '../db/stores/patient';
import vaccineStore from '../db/stores/vaccine';
import {useState,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles/Addpatient.css'
// import VaccinationForm from './VaccinationForm'

export default function Addpatient() {
  const [owner, setOwner] = useState('');
  const [redirect, setRedirect] = useState();

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

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("Male");
  const [species, setSpecies] = useState("");
  const [bodyweight, setBodyweight] = useState("");
  const [color, setColor] = useState("");
  const [fertility, setFertility] = useState("");
//   const [health, setHealth] = useState("");
  const [vaccinations, setVaccinations] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDate, setVaccineDate] = useState();
  const [profile, setProfile]=useState("");

  const [open, setOpen] = useState(false);  
  const closeModal = () => setOpen(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patient = {
            name: name,
            age: age,
            sex: sex, 
            species: species,
            color:color,
            fertility: fertility,
            bodyweight:bodyweight,
            owner: owner,
            profile : profile
        }


        let result = await patientStore.create(patient);
        alert(result);
        
            
        for (let i = 0; i < vaccinations.length; i++) {
            const vaccination = {
                name: vaccinations[i].name,
                datetime: vaccinations[i].date,
                patient: result._id
            }
            await vaccineStore.create(vaccination);
        }
        //  window.location.href = "/dashboard";
        setRedirect("/dashboard");
    }

    const addVaccine = () => {
        const temp = {
            name: vaccineName,
            datetime: vaccineDate,
        }
        setVaccinations([...vaccinations, temp])
        setOpen(false);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer">
            <div className="lheader">
                <div onClick={()=>{setRedirect("/dashboard")}} className='back-div'>
                    <img src="/images/arrow.png" alt="back"></img>
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
                        <input type="file" onChange={e=>{alert(e.target.files[0].path); setProfile(e.target.files[0].path)}}/>
                        <p>Add Photo</p>
                        {profile && <p>{profile.substring(profile.lastIndexOf("/")+1,profile.length)} <span onClick={()=>{setProfile("")}}>X</span></p>}
                    </div>


                    <div className="second">
                        <div className="form-group">
                            <label>Name :</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Age :</label>
                            <input type="number" className="form-control" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Species :</label>
                            <input type="text" className="form-control" value={species} onChange={e => setSpecies(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Sex : </label>
                            <select className="form-control" name="doctor" id="cars" value={sex} onChange={e => setSex(e.target.value)}>
                                <option selected disabled>--Pick an Option--</option>
                                <option value="Male"> Male</option>
                                <option value="Female"> Female</option>
                            </select> 
                        </div>
                        <div className="form-group">
                            <label>Body Weight(in Kgs) :</label>
                            <input type="number" className="form-control" value={bodyweight} onChange={e => setBodyweight(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Body Color :</label>
                            <input type="text" className="form-control" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        {/* <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" value={health} onChange={e => setHealth(e.target.value)} />
                        </div> */}
                    </div>

                    <div className="third">
                        <div className="form-group">
                            <label>Fertility </label>
                            <input type="radio" id="fertility-yes" name="fertility-radio" value="yes" onChange={e => setFertility(e.target.value)}/>
                            <label for="fertility-yes">Yes</label>
                            <input type="radio" id="fertility-no" name="fertility-radio" value="no" onChange={e => setFertility(e.target.value)}/>
                            <label for="fertility-no">No</label>
                            {/* <input type="text" className="form-control" value={fertility} onChange={e => setFertility(e.target.value)} /> */}
                        </div>

                        <p>Vaccination Chart</p>
                        <div className="vaccinations">
                            {vaccinations.length!==0 && vaccinations.map((vaccination)=> (
                                <div className="vaccinationCard">
                                    <p>{vaccination.name}</p>
                                    <p>{vaccination.datetime}</p>
                                </div>
                            ))}
                            <button type="button" className="button" onClick={() => setOpen(o => !o)}>Add Vaccine</button>
                            <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
                                <div>
                                <button className="close" onClick={closeModal}>  &times;  </button>
                                    <div>
                                        <label>Vaccine Name</label>
                                        <input type="text" className="form-control" value={vaccineName} onChange={e => setVaccineName(e.target.value)} />
                                        <input type="date" className="form-control" value={vaccineDate} onChange={e => setVaccineDate(e.target.value)} />
                                        <button type="button" onClick ={addVaccine} className="btn btn-primary">Add</button>
                                    </div>
                                </div>
                            </Popup>
                    </div>
                    </div>

                </div>
                <button type="submit" >Submit</button>
                {/* <button type="button" onClick={() => setRedirect("/dashboard")}>Go Back</button> */}
            </form>
        </div>
        </div>
        </div>
        </div>
    )
}

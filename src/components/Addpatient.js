import React from 'react';
import patientStore from '../db/stores/patient';
import vaccineStore from '../db/stores/vaccine';
import {useState,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import VaccinationForm from './VaccinationForm'

export default function Addpatient() {
  const [owner, setOwner] = useState('');

  useEffect(() => {
    const owner = localStorage.getItem("user");
    if (owner) {
        setOwner(owner);
    }
    else {
        window.location.href = "/";
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
         window.location.href = "/dashboard";
    }

    const addVaccine = () => {
        const temp = {
            name: vaccineName,
            datetime: vaccineDate,
        }
        setVaccinations([...vaccinations, temp])
        setOpen(false);
    }


    return (
        <div className="container-out">
            <h1>New Pet Registration</h1>
            <div className="container-in">
            <form onSubmit={handleSubmit}>  
                <div className="row">
                    <div className="col-md-2">
                        <p>Add Photo</p>
                        <input type="file" onChange={e=>{alert(e.target.files[0].path); setProfile(e.target.files[0].path)}}/>

                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="number" className="form-control" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Species</label>
                            <input type="text" className="form-control" value={species} onChange={e => setSpecies(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Sex</label>
                            <select name="doctor" id="cars" value={sex} onChange={e => setSex(e.target.value)}>
                                <option selected disabled>--Pick an Option--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select> 
                        </div>
                        <div className="form-group">
                            <label>Body Weight(in Kgs)</label>
                            <input type="number" className="form-control" value={bodyweight} onChange={e => setBodyweight(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Body Color</label>
                            <input type="text" className="form-control" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        {/* <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" value={health} onChange={e => setHealth(e.target.value)} />
                        </div> */}
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Fertility</label>
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
                <button type="submit" className="btn btn-primary">Submit</button>
                <a href="/dashboard">Go Back</a>
            </form>
        </div>
        </div>
    )
}

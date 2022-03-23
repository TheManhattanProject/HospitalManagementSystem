import React from 'react';
import patientStore from '../db/stores/patient';
import vaccineStore from '../db/stores/vaccine';
import {useState,useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
// import VaccinationForm from './VaccinationForm'

export default function Addpatient(props) {
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
  const [sex, setSex] = useState("");
  const [species, setSpecies] = useState("");
  const [bodyweight, setBodyweight] = useState("");
  const [color, setColor] = useState("");
  const [fertility, setFertility] = useState("");
  const [health, setHealth] = useState("");
  const [vaccinations, setVaccinations] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [vaccineDate, setVaccineDate] = useState();

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
            health:health,
            owner: owner
        }


        let result = await patientStore.create(patient);
        console.log(result);
        
            
        for (let i = 0; i < vaccinations.length; i++) {
            const vaccination = {
                name: vaccinations[i].name,
                datetime: vaccinations[i].date,
                patient: result._id
            }
            vaccineStore.create(vaccination);
        }
        // window.location.href = "/dashboard";
    }

    const addVaccine = (e) => {
        e.preventDefault()
        const temp = {
            name: vaccineName,
            datetime: vaccineDate,
        }
        setVaccinations([...vaccinations, temp])
    }

    return (
        <div className="container">
            <h1>New Pet Registration</h1>
            <form onSubmit={handleSubmit}>  
                <div className="row">
                    <div className="col-md-2">
                        <p>Add Photo</p>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input type="text" className="form-control" value={age} onChange={e => setAge(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Species</label>
                            <input type="text" className="form-control" value={species} onChange={e => setSpecies(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Sex</label>
                            <input type="text" className="form-control" value={sex} onChange={e => setSex(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Bodyweight</label>
                            <input type="text" className="form-control" value={bodyweight} onChange={e => setBodyweight(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <input type="text" className="form-control" value={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" value={health} onChange={e => setHealth(e.target.value)} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="form-group">
                            <label>Fertility</label>
                            <input type="text" className="form-control" value={fertility} onChange={e => setFertility(e.target.value)} />
                        </div>
                        <p>Vaccination Chart</p>
                        <div className="vaccinations">
                            {vaccinations.length && vaccinations.map((vaccination)=> (
                                <div className="vaccinationCard">
                                    <p>{vaccination.name}</p>
                                    <p>{vaccination.datetime}</p>
                                </div>
                            ))}
                            <Popup trigger={<button> Add vaccine</button>} open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
                                <div>
                                    <form onSubmit={addVaccine}>
                                        <div className="form-group">
                                            <label>Vaccine Name</label>
                                            <input type="text" className="form-control" value={vaccineName} onChange={e => setVaccineName(e.target.value)} />
                                            <input type="date" className="form-control" value={vaccineDate} onChange={e => setVaccineDate(e.target.value)} />
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </div>
                                    </form>
                                </div>
                            </Popup>
                    </div>
                    </div>

                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <a href="/dashboard">Go Back</a>
            </form>
        </div>
    )
}

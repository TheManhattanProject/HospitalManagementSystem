import React from 'react';
import patientStore from '../db/stores/patient';
import vaccineStore from '../db/stores/vaccine';
import {useState,useEffect} from 'react';
import VaccinationForm from './VaccinationForm'

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
  
    const handleSubmit = (e) => {
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

        let result = patientStore.create(patient);
        for (let i = 0; i < vaccinations.length; i++) {
            const vaccination = {
                name: vaccinations[i].name,
                datetime: vaccinations[i].date,
                patient: result._id
            }
            vaccineStore.create(vaccination);
        }
    }

    const addVaccine = (e) => {
        e.preventDefault()
        const temp = {
            name: vaccineName,
            datetime: vaccineDate,
        }
        setVaccinations((vaccinations) => vaccinations.push(temp));
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
                            {vaccinations.map((vaccination)=> (
                                <div className="vaccinationCard">
                                    <p>{vaccination.name}</p>
                                    <p>{vaccination.datetime}</p>
                                </div>
                            ))}
                            <div class="modal fade" id="vaccinationForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header text-center">
                                            <h4 class="modal-title w-100 font-weight-bold">Vaccine</h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body mx-3">
                                            <form className="login-form">
                                                <input type="text" placeholder="Vaccine Name" value={vaccineName} onChange={(e)=>setVaccineName(e.target.value)}/>
                                                <input type="date" value={vaccineDate} onChange={(e)=>setVaccineDate(e.target.value)}/>
                                                <button onClick ={addVaccine}>Submit</button>
                                            </form>
                                        </div>
                                        <div class="modal-footer d-flex justify-content-center">
                                            <button class="btn btn-default" data-toggle="modal" data-target="#vaccinationForm">Login</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <a href="" class="btn btn-default btn-rounded mb-4" data-toggle="modal" data-target="#vaccinationForm">Add Vaccination</a>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <a href="/dashboard">Go Back</a>
            </form>
        </div>
    )
}

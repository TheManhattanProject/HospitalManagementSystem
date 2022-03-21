import React from 'react';
import patientStore from '../db/stores/patient';
import {useState,useEffect} from 'react';

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
        console.log(result);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Add a Patient</h1>
                    <form onSubmit={handleSubmit}>  
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
                            <label>Fertility</label>
                            <input type="text" className="form-control" value={fertility} onChange={e => setFertility(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" value={health} onChange={e => setHealth(e.target.value)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )





}

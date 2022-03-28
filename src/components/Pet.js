import './styles/Pet.css';
import {Navigate} from 'react-router-dom';
import React from 'react';
import {useState} from 'react';

export default function Pet(props) {
    const [redirect, setRedirect] = useState();
    

    console.log(props);
    if (redirect) {
        return <Navigate to={redirect} />;
    }
    
    return (
    <div className="petCard">
        {/* <img src={`file://${props.pet.profile}`} alt={props.pet.name} /> */}
        <img src="https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg" alt={props.pet.name} />
        <h3>{props.pet.name}</h3>
        <p>Species: {props.pet.species}</p>
        <button type="button" onClick={()=>{setRedirect(`/patient/history?id=${props.pet._id}`)}}>View History</button>
    </div>)
}
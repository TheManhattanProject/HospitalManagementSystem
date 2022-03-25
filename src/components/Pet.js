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
        <h3>{props.pet.name}</h3>
        <img src={props.pet.profile} alt={props.pet.name} />
        <p>Species: {props.pet.species}</p>
        <button type="button" onClick={()=>{setRedirect(`/patient/history?id=${props.pet._id}`)}}>View History</button>
    </div>)
}
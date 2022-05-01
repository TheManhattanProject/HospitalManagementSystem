import './styles/Pet.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import {useState} from 'react';
import defimg from "../assets/defimg.jpeg";

export default function Pet(props) {
    const navigate = useNavigate();
    
    
    return (
    <div className="petCard">
        {props.pet.profile && <img src={`file://${props.pet.profile}`} alt={props.pet.name} />}
        {!props.pet.profile && <img src={defimg} alt={props.pet.name} />}
        {/* <img src="https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg" alt={props.pet.name} /> */}
        <h3>{props.pet.name}</h3>
        <p>Species: {props.pet.species}</p>
        <button type="button" onClick={()=>{navigate(`/patient/history?id=${props.pet._id}`)}}>View History</button>
    </div>)
}
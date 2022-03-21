import React from 'react';
import patientStore from '../db/stores/patient';
import { useEffect, useState } from 'react/cjs/react.production.min';

export default function Dashboard(){
    const [pets, setPets] = useState([]);

    useEffect(()=> {
        setPets(patientStore.getPets())
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <h3>Your Pets</h3>
            <div className="pets">
                {pets.map(pet => (
                    <div className="petCard">
                        <h3>{pet.name}</h3>
                        <p>Species: {pet.species}</p>
                        <button>View History</button>
                    </div>
                ))}
            </div>

        </div>
    )
}
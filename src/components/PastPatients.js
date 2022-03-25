import { useState, useEffect } from "react";
import appointmentsStore from '../db/stores/appointments';
import Pet from './Pet.js';
import {Navigate} from 'react-router-dom';

export default function PastPatients() {

    const [pets, setPets] = useState([]);
    const [redirect , setRedirect] = useState();

    async function getData(){
        let user = localStorage.getItem("vet");
        if (!user) {
            setRedirect("/vet/login");
        }
        let pets = await appointmentsStore.getVetPets(user);
        setPets(pets);
    }

  
    useEffect(() => {   
        getData();
    }, []);

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="past-history">
            <h1>Past History</h1>
            <div className="past-history-container">
                {pets.length && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>
        </div>
          
    )
}
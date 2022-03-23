import { useState, useEffect } from "react";
import appointmentsStore from '../db/stores/appointments';
import Pet from './Pet.js';
export default function PastPatients() {
    const [pets, setPets] = useState([]);

    async function getData(){
        let user = localStorage.getItem("vet");
        if (!user) {
            window.location.href = "/";
        }
        let pets = await appointmentsStore.getVetPets(user);
        setPets(pets);
    }
    useEffect(() => {   
        getData();
    }, []);

    return (
        <div className="past-history">
            <h1>Past History</h1>
            <div className="past-history-container">
                {pets.length && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>
        </div>
          
    )
}
import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import Pet from "./Pet";

export default function YourPets() {

    const [pets, setPets] = useState([]);
    
    const getData = async() => {
        let user = localStorage.getItem("user");
        if (!user) {
            window.location.href = "/";
        }
        setPets(await patientStore.getPets(user))
    }

    useEffect(()=> {
        
        getData();
    }, [])

    return (
        <div className="pets-container">
            <h1>Your Pets</h1>
            {pets.length && <div className="pets">
                {pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <a href="/patient/add">Add Patient</a>
                </div>
            </div>}
            <button onClick={() => window.location.href = "/dashboard"}>Back</button>
        </div>
    );
}
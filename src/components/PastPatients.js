import { useState, useEffect } from "react";
import appointmentsStore from '../db/stores/appointments';
import Pet from './Pet.js';
import {Navigate} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
import "./styles/PastPatients.css"


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
        <div className="outer">
            <div className="lheader">
                    <div onClick={()=>{setRedirect("/vet/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                    </div>
                    <Header />
                </div>
            <div className="lout">
                <Sidebar currentTab={5}/>
            <div className="cont-out">
            <h1>Past History</h1>
            <div className="cont-in">
            <div className="past-history-container">
                {pets.length && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
            </div>
            </div>
        </div>
        </div>
        </div>  
    )
}
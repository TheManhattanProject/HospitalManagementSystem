import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import Pet from "./Pet";
import {Navigate} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";


export default function YourPets() {

    const [pets, setPets] = useState([]);
    const [redirect, setRedirect] = useState();
    
    const getData = async() => {
        let user = localStorage.getItem("user");
        if (!user) {
            setRedirect("/");
        }
        setPets(await patientStore.getPets(user))
    }

    useEffect(()=> {
        
        getData();
    }, [])

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className="outer"> 
        <div className="lheader">
        <div onClick={()=>{setRedirect("")}} className='back-div'>
            <img src="/images/arrow.png" alt="back"></img>
        </div>
        <Header />
        </div>        
        
        <div className="lout">
        <Sidebar currentTab={1}/>
        <div className="cont-out">
            <h1>Your Pets</h1>
            <div className="cont-in">
            {pets.length!==0 && <div className="pets">
                {pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <button type="button" onClick={setRedirect("/patient/add")}>Add Patient</button>
                </div>
            </div>}
            <button onClick={() =>setRedirect("/dashboard")}>Back</button>
        </div>
        </div>
        </div>  
        </div>
    );
}
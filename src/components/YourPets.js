import { useEffect, useState } from "react";
import patientStore from "../db/stores/patient";
import Pet from "./Pet";
import {Navigate} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import './styles/YourPets.css';


export default function YourPets() {

    const [pets, setPets] = useState([]);
    const [redirect, setRedirect] = useState();
    
    const getData = async() => {
        let user = localStorage.getItem("admin");
        if (!user) {
            setRedirect("/login");
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
        <div onClick={()=>{setRedirect("/dashboard")}} className='back-div'>
            <img src={backIcon} alt="back"></img>
        </div>
        <Header />
        </div>        
        
        <div className="lout">
        <Sidebar currentTab={1}/>
        <div className="cont-out">
            <h1>Your Pets</h1>
            <div className="cont-in">
            {<div className="pets">
                {pets.length!==0 && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <button type="button" onClick={()=>setRedirect("/patient/add")}>+</button>
                    <p className="bold-text">Add new</p>
                </div>
            </div>}
        </div>
        </div>
        </div>  
        </div>
    );
}
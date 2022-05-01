import React from 'react';
import appointmentsStore from '../db/stores/appointments';
import ownerStore from '../db/stores/owner'
import { useEffect, useState } from 'react';
import PrevVisits from './PrevVisits';
import Pet from './Pet';
import './styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png";
import Select from 'react-select';
import PatientStore from '../db/stores/patient'


export default function AllAnimals(){
    const navigate = useNavigate();

    
        
    const [animals, setAnimals] = useState([]);
    const getData = async() => {
        let user = localStorage.getItem("admin");
        if (!user) {
            // window.location.href = "/";
            navigate("/");
        }
        let pets = await PatientStore.readAll();
        let opts = [];
        let owners = await ownerStore.readAll();
        console.log(owners)
        console.log(await adminStore.readAll());
        if (owners) {
            owners.forEach(owner => {
                opts.push({value: owner._id, label: owner.email})
            })
            setOwnerList(opts);
        }
    }
    
    useEffect(()=> {
        getData();
    }, [])

    useEffect(() => {
        const setPatients = async () => {
            if (selectedOwner && selectedOwner.value) {
                let pets = await patientStore.getPets(selectedOwner.value);
                setPets(pets);
                setAppointments(await appointmentsStore.getPastAppointments(selectedOwner.value));
            }
        }
        setPatients();

    }, [selectedOwner])

    // if (redirect) {
    //     return <Navigate to={redirect} />
    // }

    return (
        <div className='outer'>
            <div className="lheader">
                <div onClick={()=>{setRedirect("")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>
                <Header />
            </div>
        <div className='lout'>
            <Sidebar currentTab={0}/>
        <div className="cont-out">
            <h1>Home</h1>
            <div className="cont-in">
            <h3>Pets</h3>
            {ownerList && <Select className ="selectbar" defaultValue={selectedOwner} options={ownerList} onChange={setSelectedOwner}/>}
            <div className="pets">
                {pets.length!==0 && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                <div className="add-pets">
                    <button type="button" onClick={() => navigate("/patient/add")}>+</button>
                    <p className='bold-text'>Add New</p>
                </div>
            </div>
            {appointments && <PrevVisits appointments={appointments} appointment={{_id: 0}} />}
            {/* <h3>Previous Visits</h3>
            <div className="appointments">
                {appointments.length!==0 && appointments.map(appointment => <AppointmentCard key={appointment._id} appointment={appointment}/>)}
            </div> */
            /* <div className='buttons'>
            <button type="button" onClick={() => setRedirect('/appointment')}>BookAppointment</button>
            <button type="button" onClick={() => setRedirect('/patients')}>Your pets</button>
            <button onClick={logout}>Logout</button>
            </div> */}
        </div>
        </div>
        </div>
        </div>
    )
}
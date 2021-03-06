import React from 'react';
import patientStore from '../db/stores/patient';
import appointmentsStore from '../db/stores/appointments';
import ownerStore from '../db/stores/owner'
import { useEffect, useState } from 'react';
import PrevVisits from './PrevVisits';
import Pet from './Pet';
import './styles/Dashboard.css';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png";
import Select from 'react-select';
import adminStore from '../db/stores/admin'


export default function Dashboard(){
    const navigate = useNavigate();

    
        
    const [pets, setPets] = useState([]);
    const [ownerList, setOwnerList] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedOwner, setSelectedOwner] = useState();

    const getData = async() => {
        let user = localStorage.getItem("admin");
        // if (!user) {
        //     // window.location.href = "/";
        //     navigate("/");
        // }

        // let pets = await patientStore.getPets(user);
        // setPets(pets);
        // setAppointments(await appointmentsStore.getPastAppointments(user));
        let opts = [];
        let owners = await ownerStore.readAll();
        if (owners) {
            owners.forEach(owner => {
                opts.push({value: owner._id, label: `${owner.name} - ${owner.phone}`})
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

    return (
        <div className='outer'>
            <div className="lheader">
                <div onClick={()=>{navigate("")}} className='back-div'>
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
            <div className="add-pets">
                    <button type="button" onClick={() => navigate("/patient/add")}>+</button>
                    <p className='bold-text'>Add New</p>
                </div>
                {pets.length!==0 && pets.map(pet => <Pet key={pet._id} pet={pet} />)}
                
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
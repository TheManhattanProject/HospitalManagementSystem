import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/Sidebar.css';
import homeIcon from "../assets/Home_icon.png"
import petIcon from "../assets/Pet_icon.png"
import historyIcon from "../assets/History_icon.png"
import appointmentIcon from "../assets/Appointment_icon.png"
import inventoryIcon from "../assets/Inventory_icon.png"
import profileIcon from "../assets/Profile_icon.png"
import animalsIcon from "../assets/Animals.png";
import megaPhone from "../assets/Megaphone.png";
import peopleIcon from "../assets/People.png";
import markettingIcon from "../assets/Marketing.png";

export default function Sidebar(props) {
    const navigate = useNavigate();

    const [user, setUser] = useState();
    const [vet, setVet] = useState();

    useEffect(() => {
        setUser(localStorage.getItem('admin'));
        setVet(localStorage.getItem('vet'));
        console.log(window.location.href);
    }, []);


    return (
        <div className="sidebar">
            <div className="sidebar-body">
                {/* {!user && !vet && <div className="nav-item" onClick={() => setRedirect("/")}>  
                    <img src="/images/Home_icon.svg" alt="Home" />
                </div>}

                {!user && !vet && <div className="nav-item" onClick={() => setRedirect("/login")}>
                    <img src="/images/Patient_icon.svg" alt="Login" className='login-svg'/>
                    <p className='nav-name'>Patient Login</p>
                </div>}

                {!user && !vet && <div className="nav-item" onClick={() => setRedirect("/vet/login")}>
                    <img src="/images/Doctor_icon.svg" alt="Login" className='login-svg'/>
                    <p className="nav-name">Doctor Login</p>
                </div>} */}

                {user && <div className={props.currentTab===0 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/dashboard")}>
                <img src={markettingIcon} alt="Home"/>
                    <p className='nav-name'>Dashboard</p>
                </div>}

                {user && <div className={props.currentTab===1 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/patient/add")}>
                    <img src={petIcon} alt="Patients"/>
                    <p className='nav-name'>Add Animals</p>
                </div>}
{/* 
                {user && <div className={props.currentTab===2 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/patient/history")}>
                <img src={historyIcon} alt="History"/>
                    <p className='nav-name'>History</p>
                </div>} */}

                {user && <div className={props.currentTab===3 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/appointment")}>
                <img src={appointmentIcon} alt="Appointment"/>
                    <p className='nav-name'>Book Your Visit</p>
                </div>}

                {user && <div className={props.currentTab===9 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/addowner")}>
                <img src={peopleIcon} alt="Add owner"/>
                    <p className='nav-name'>Add owner</p>
                </div>}

                {user && <div className={props.currentTab===10 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/allanimals")}>
                <img src={animalsIcon} alt="Animals"/>
                    <p className='nav-name'>All Animals</p>
                </div>}

                {vet && <div className={props.currentTab===4 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/vet/dashboard")}>
                <img src={homeIcon} alt="Home"/>
                    <p className='nav-name'>Home</p>
                </div>}

                {vet && <div className={props.currentTab===5 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/vet/patients")}>
                <img src={petIcon} alt="History"/>
                    <p className='nav-name'>Your Patients</p>
                </div>}

                {vet && <div className={props.currentTab===2 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/patient/history")}>
                <img src={historyIcon} alt="History"/>
                    <p className='nav-name'>Patient History</p>
                </div>}

                {vet && <div className={props.currentTab===7 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/inventory")}>
                <img src={inventoryIcon} alt="Inventory"/>
                    <p className='nav-name'>Inventory</p>
                </div>}

                {vet && <div className={props.currentTab===8 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/vet/profile")}>
                <img src={profileIcon} alt="History"/>
                    <p className='nav-name'>Profile</p>
                </div>}

                
                <div className={props.currentTab===11 ? "nav-item nav-selected" : "nav-item"} onClick={() => navigate("/allannouncementes")}>
                <img src={megaPhone} alt="Announcements"/>
                    <p className='nav-name'>Announcements</p>
                </div>

            </div>
        </div>
    );
}

        
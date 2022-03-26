import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/Sidebar.css';

export default function Sidebar(props) {

    const [redirect, setRedirect] = useState();
    const [user, setUser] = useState();
    const [vet, setVet] = useState();

    useEffect(() => {
        setUser(localStorage.getItem('user'));
        setVet(localStorage.getItem('vet'));
        console.log(window.location.href);
    }, []);

    if (redirect) {
        return <Navigate to={redirect} />
    }

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

                {user && <div className={props.currentTab===0 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/dashboard")}>
                <img src="/images/Home_icon.png" alt="Home"/>
                    <p className='nav-name'>Home</p>
                </div>}

                {user && <div className={props.currentTab===1 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/patients")}>
                    <img src="/images/Pet_icon.png" alt="Patients"/>
                    <p className='nav-name'>Your Pets</p>
                </div>}

                {user && <div className={props.currentTab===2 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/patient/history")}>
                <img src="/images/History_icon.png" alt="History"/>
                    <p className='nav-name'>History</p>
                </div>}

                {user && <div className={props.currentTab===3 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/appointment")}>
                <img src="/images/Appointment_icon.png" alt="Appointment"/>
                    <p className='nav-name'>Book Your Visit</p>
                </div>}
                
                {vet && <div className={props.currentTab===4 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/vet/dashboard")}>
                <img src="/images/Home_icon.png" alt="Home"/>
                    <p className='nav-name'>Home</p>
                </div>}

                {vet && <div className={props.currentTab===5 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/vet/patients")}>
                <img src="/images/Pet_icon.png" alt="History"/>
                    <p className='nav-name'>Your Patients</p>
                </div>}

                {vet && <div className={props.currentTab===6 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/patient/history")}>
                <img src="/images/History_icon.png" alt="History"/>
                    <p className='nav-name'>Patient History</p>
                </div>}

                {vet && <div className={props.currentTab===7 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/inventory")}>
                <img src="/images/Inventory_icon.png" alt="Inventory"/>
                    <p className='nav-name'>Inventory</p>
                </div>}

                {vet && <div className={props.currentTab===8 ? "nav-item nav-selected" : "nav-item"} onClick={() => setRedirect("/vet/profile")}>
                <img src="/images/Profile_icon.png" alt="History"/>
                    <p className='nav-name'>Profile</p>
                </div>}
            </div>
        </div>
    );
}

        
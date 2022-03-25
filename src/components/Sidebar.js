import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './styles/Sidebar.css';

export default function Sidebar() {

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
                {!user && !vet && <div className="nav-item" onClick={() => setRedirect("/")}>  
                    <img src="/images/Home_icon.svg" alt="Home" />
                </div>}

                {!user && !vet && <div className="nav-item" onClick={() => setRedirect("/login")}>
                    <img src="/images/Patient_icon.svg" alt="Login" className='login-svg'/>
                    <p className='nav-name'>Patient Login</p>
                </div>}

                {!user && !vet && <div className="nav-item" onClick={() => setRedirect("/vet/login")}>
                    <img src="/images/Doctor_icon.svg" alt="Login" className='login-svg'/>
                    <p className="nav-name">Doctor Login</p>
                </div>}

                {user && <div className="nav-item" onClick={() => setRedirect("/dashboard")}>
                    <i icon="fa-solid fa-user-doctor" />
                    <p className='nav-name'>Home</p>
                </div>}

                {user && <div className="nav-item" onClick={() => setRedirect("/patients")}>
                    <i icon="fa-solid fa-user-injured" />
                    <p className='nav-name'>Your Pets</p>
                </div>}

                {user && <div className="nav-item" onClick={() => setRedirect("/patient/history")}>
                    <i icon="fa-solid fa-history" />
                    <p className='nav-name'>History</p>
                </div>}

                {user && <div className="nav-item" onClick={() => setRedirect("/appointment")}>
                    <i icon="fa-solid fa-calendar-alt" />
                    <p className='nav-name'>Book Your Visit</p>
                </div>}
                
                {vet && <div className="nav-item" onClick={() => setRedirect("/vet/dashboard")}>
                    <i icon="fa-solid fa-user-injured" />
                    <p className='nav-name'>Home</p>
                </div>}

                {vet && <div className="nav-item" onClick={() => setRedirect("/vet/patients")}>
                    <i icon="fa-solid fa-user-injured" />
                    <p className='nav-name'>Your Patients</p>
                </div>}

                {vet && <div className="nav-item" onClick={() => setRedirect("/patient/history")}>
                    <i icon="fa-solid fa-user-injured" />
                    <p className='nav-name'>Patient History</p>
                </div>}

                {vet && <div className="nav-item" onClick={() => setRedirect("/inventory")}>
                    <i icon="fa-solid fa-user-injured" />
                    <p className='nav-name'>Inventory</p>
                </div>}

                {vet && <div className="nav-item" onClick={() => setRedirect("/vet/profile")}>
                    <i icon="fa-solid fa-user-injured" />
                    <p className='nav-name'>Profile</p>
                </div>}
            </div>
        </div>
    );
}

        
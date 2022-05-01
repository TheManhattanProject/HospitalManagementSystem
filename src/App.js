
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import YourPets from './components/YourPets';
import PatientHistory from './components/PatientHistory';
import AddPatient from './components/Addpatient';
import AddOwner from './components/Addowner';
import DetailedPrescription from './components/DetailedPrescription';
import BookAppointment from './components/BookAppointment';
import VetDashboard from './components/VetDashboard';
import VetRegister from './components/DoctorRegister';
import AddPrescription from './components/AddPrescription';
import Inventory from './components/Inventory';
import DoctorLogin from './components/DoctorLogin';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';
import {useEffect, useState} from 'react';
import Sidebar from './components/Sidebar';
import PastPatients from './components/PastPatients';
import DoctorProfile from './components/DoctorProfile';
import AllAnimals from './components/AllAnimals';
import Header from './components/Header';

function App() {

  useEffect(() => {
  }, []);

  return (
    <div className='main-container'>
     
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<YourPets />} />
            <Route path="/patient/history" element={<PatientHistory />} />
            <Route path="/patient/add" element={<AddPatient />} />
            <Route path="/prescription" element={<DetailedPrescription />} />
            <Route path="/appointment" element={<BookAppointment />} />
            <Route path="/vet/dashboard" element={<VetDashboard />} />
            <Route path="/vet/register" element={<VetRegister />} />
            <Route path="/vet/patients" element={<PastPatients />} />
            <Route path="/vet/profile" element={<DoctorProfile />} />
            <Route path ="/prescription/new" element={<AddPrescription />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/vet/login" element={<DoctorLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/addowner" element={<AddOwner />} />
            <Route path="/allanimals" element={<AllAnimals />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

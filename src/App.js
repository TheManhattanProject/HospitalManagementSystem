
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import YourPets from './components/YourPets';
import PatientHistory from './components/PatientHistory';
import AddPatient from './components/Addpatient';
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

function App() {
  const [user, setUser] = useState();
  const [vet, setVet] = useState();

  useEffect(() => {
     setUser(localStorage.getItem('user'));
     setVet(localStorage.getItem('vet'));
  }, []);

  return (
    <div className="App">
    {user && <Sidebar></Sidebar>}
    {vet && <Sidebar></Sidebar>}


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
          <Route path ="/prescription/new" element={<AddPrescription />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/vet/login" element={<DoctorLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

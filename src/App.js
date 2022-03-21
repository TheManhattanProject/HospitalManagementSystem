
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import YourPets from './components/YourPets';
import PatientHistory from './components/Patienthistory';
import AddPatient from './components/AddPatient';
import DetailedPrescription from './components/DetailedPrescription';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<YourPets />} />
          <Route path="/patient/history" element={<PatientHistory />} />
          <Route path="/patient/add" element={<AddPatient />} />
          <Route path="/prescription" element={<DetailedPrescription />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;

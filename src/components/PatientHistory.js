import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import patientStore from "../db/stores/patient";
import appointmentStore from "../db/stores/appointments";
import vaccineStore from "../db/stores/vaccine";
import veternarianStore from "../db/stores/veternarian";
import PrevVisits from "./PrevVisits";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import "./styles/PatientHistory.css";
import AsyncSelect from "react-select/async";

export default function Patienthistory() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("id");
  const appid = searchParams.get("apptid");
  const [apptid, setapptid] = useState(appid);
  const [patient, setPatient] = useState();
  const [appointment, setAppointment] = useState();
  const [appointments, setAppointments] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedpet, setSelectedpet] = useState();


  const customStyles = {
    dropdownIndicator: () => ({
      color: "grey",
      paddingLeft: "10px",
      paddingRight: "5px",
    }),

    control: (provided, state) => ({
      ...provided,
      outline: "none",
      boxShadow: "none",
      width: "15rem",
      backgroundColor: "transparent",
      marginBottom: "0.4rem",
      marginLeft: "0.4rem",
      marginTop: "0.4rem",
    }),

    clearIndicator: () => ({
      color: "grey",
      paddingRight: "10px",
    }),
  };

  const setcurrappointment = (Cappointment) => {

    console.log("inside set current appointment ....")
    console.log(Cappointment)
    setAppointment(Cappointment);
  };

  useEffect(() => {
    const getData = async () => {
      let user = localStorage.getItem("user");
      if (!user) {
        user = localStorage.getItem("vet");
        if (!user) {
          user = localStorage.getItem("admin");
          if (!user) {
            navigate("/");
          } else {
            setDoctor(user);
            setPatients(await appointmentStore.getVetPets(user));
          }
        } else {
          setDoctor(user);
          setPatients(await appointmentStore.getVetPets(user));
        }
      } else {
        setPatients(await patientStore.getPets(user));
      }
      if (pid) {
        let pt = await patientStore.getPatient(pid);
        setPatient(pt);
        setSelectedpet({ value: pt._id, label: pt.name });
      }

      if (apptid) {
        let currappt = await appointmentStore.read(apptid);
        if (currappt && currappt.veternarian) {
          currappt.veternarian = await veternarianStore.read(
            currappt.veternarian
          );
        }

        setAppointment(currappt);
      }

      setVaccinations(await vaccineStore.getVaccinations(pid));

      
      
    };

    getData();
  }, [pid, apptid]);




  useEffect(() => {
    const updateAppts = async () => {
      let appts = await appointmentStore.getAppointments(patient._id);
      setAppointments(appts);
      
      setAppointment(null);
      setVaccinations(await vaccineStore.getVaccinations(patient._id));
    };
    if (patient) {
      updateAppts();
    }
  }, [patient]);



  const promiseOptionsPets = async (inputValue) => {
    let user = null;
    user = localStorage.getItem("vet");
    if (!user) {
      user = localStorage.getItem("admin");
    }
    return appointmentStore.getVetPets(user).then((datatemp) => {
      return datatemp.map((temp) => {
        return { value: temp._id, label: `${temp.name}` };
      });
    });
  };


 async function handleAsyncSelectPet(event) {

   if (patients) {
        patients.forEach((pet) => {
          if (pet._id === event.value) {
            setPatient(pet);
          }
        });}

    setSelectedpet(event);
  }

  return (
    <div className="outer">
      <div className="lheader">
        {doctor ? (
          <div
            onClick={() => {
              navigate("/vet/dashboard");
            }}
            className="back-div"
          >
            <img src={backIcon} alt="back"></img>
          </div>
        ) : (
          <div
            onClick={() => {
              navigate("/dashboard");
            }}
            className="back-div"
          >
            <img src={backIcon} alt="back"></img>
          </div>
        )}

        <Header />
      </div>

      <div className="lout">
        <Sidebar currentTab={2} />

        <div className="cont-out">
          <h1>History</h1>
          <div className="cont-in">
            {patients.length !== 0 && (
              <div className="pet-names">
                <p className="sub-heading-book">Select a patient :</p>
                <AsyncSelect
                      defaultOptions
                      value={selectedpet}
                      loadOptions={promiseOptionsPets}
                      onChange={handleAsyncSelectPet}
                      styles={customStyles}
                      isSearchable={true}
                    />
              </div>
            )}
            {patient && (
              <div className="all-info">
                <div className="patient-row">
                  <div className="pet-row">
                    <p className="pet-detail">Pet Name: </p>
                    <p>{patient.name}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Species: </p>
                    <p>{patient.species}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Age: </p>
                    <p>{patient.age}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Sex: </p>
                    <p>{patient.sex}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Body Weight: </p>
                    <p>{patient.bodyweight}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Body Color: </p>
                    <p>{patient.color}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Initial History: </p>
                    <p>{patient.history}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Fertility: </p>
                    {patient.fertility === "yes" ? (
                      <input
                        type="radio"
                        id="fertility-yes"
                        name="fertility-radio"
                        value="yes"
                        checked
                        disabled
                      />
                    ) : (
                      <input
                        type="radio"
                        id="fertility-yes"
                        name="fertility-radio"
                        value="yes"
                        disabled
                      />
                    )}
                    <label htmlFor="fertility-yes">Yes</label>
                    {patient.fertility === "no" ? (
                      <input
                        type="radio"
                        id="fertility-no"
                        name="fertility-radio"
                        value="no"
                        checked
                        disabled
                      />
                    ) : (
                      <input
                        type="radio"
                        id="fertility-no"
                        name="fertility-radio"
                        value="no"
                        disabled
                      />
                    )}
                    <label htmlFor="fertility-no">No</label>
                  </div>
                  {doctor &&
                    appointment &&
                    appointment.veternarian._id === doctor &&
                    !appointment.prescription && (
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/prescription/new?id=${appointment._id}`)
                        }
                      >
                        Add Prescription
                      </button>
                    )}
                </div>

                <div className="vaccination-row">
                  <p className="sub-heading">Vaccination Chart:</p>
                  {vaccinations.length !== 0 && (
                    <div className="vaccinations">
                      {vaccinations.map((vaccination, i) => (
                        <div className="vaccinationCard" key={vaccination._id}>
                          <p className="bold-text">
                            Vaccination Name{" "}
                            <span className="vaccinationTitles">
                              {vaccination.name}
                            </span>
                          </p>
                          <p className="bold-text">
                            Vaccination Date{" "}
                            <span className="vaccinationTitles">
                              {vaccination.datetime}
                            </span>
                          </p>
                          <p className="bold-text">
                            Booster Dose Name{" "}
                            <span className="vaccinationTitles">
                              {vaccination.boostername}
                            </span>{" "}
                          </p>
                          <p className="bold-text">
                            Booster Dose Date{" "}
                            <span className="vaccinationTitles">
                              {" "}
                              {vaccination.boosterdatetime}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {appointment && (
                  <div className="patient-row">
                    <p className="sub-heading">Last Visit</p>
                    {appointment.veternarian && (
                      <div className="pet-row">
                        <p className="pet-detail">Doctor's Name: </p>
                        <p>{appointment.veternarian.name}</p>
                      </div>
                    )}
                    <div className="pet-row">
                      <p className="pet-detail">Reason Of Visit: </p>
                      <p>{appointment.reason}</p>
                    </div>
                    <div className="pet-row">
                      <p className="pet-detail">Date Of Visit: </p>
                      <p>{appointment.datetime}</p>
                    </div>
                    {appointment.prescription && (
                      <button
                        onClick={() => {
                          navigate(`/prescription?id=${appointment._id}`);
                        }}
                      >
                        View Full Prescription
                      </button>
                    )}
                    
                  </div>
                )}
                <div className="empty-div"></div>
              </div>
            )}
            <PrevVisits
              setcurrappointment={setcurrappointment}
              appointments={appointments}
              appointment={apptid ? appointment : { _id: 0 }}
            />
          
          </div>
        </div>
      </div>
    </div>
  );
}

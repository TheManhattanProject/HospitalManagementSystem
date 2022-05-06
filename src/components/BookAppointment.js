import React from "react";
import patientStore from "../db/stores/patient";
import veternarianStore from "../db/stores/veternarian";
import appointmentStore from "../db/stores/appointments";
import ownerStore from "../db/stores/owner";
import { useState, useEffect, useRef } from "react";
import "./styles/BookAppointment.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import backIcon from "../assets/arrow.png";
import "./styles/BookAppointment.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
const { dialog, BrowserWindow } = window.require("electron").remote;

export default function BookAppointment() {

    const customStyles = {
        dropdownIndicator: () => ({
          color: "grey",
          paddingLeft: "10px",
          paddingRight: "5px",
        }),
    
        control: (provided, state) => ({
          ...provided,
          //   border: "1px solid grey !important",
          //   borderRadius: "px",
          outline: "none",
          boxShadow: "none",
          width: "15rem",
          minHeight: '32px',
          height: '32px',
          backgroundColor: "transparent",
          marginLeft:"16px",
          marginTop:"2px"
         
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '32px',
            padding: '0 2px'
          }),
          input: (provided, state) => ({
            ...provided,
            margin: '0px',
          }),
          indicatorSeparator: state => ({
            display: 'none',
          }),
          indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '32px',
          }),
    
        clearIndicator: () => ({
          color: "grey",
          paddingRight: "10px",
        }),
      };




  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [currentPatient, setCurrentPatient] = useState();
  const remark = useRef();
  const reason = useRef();
  const date = useRef();
  const [vet, setVet] = useState();
  const [options, setOptions] = useState([]);
  const [selectedpet, setSelectedpet] = useState();
  const [owner, setOwner] = useState("");

  const promiseOptionsOwners = async (inputValue) => {
    return ownerStore.readAll().then((datatemp) => {
      return datatemp.map((temp) => {
        return { value: temp._id, label: `${temp.name} - ${temp.phone}` };
      });
    });
  };
  function handleAsyncSelectOwner(event) {
    setOwner(event);
  }

  const alertbox = (m) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(window, {
      title: "  Alert",
      buttons: ["Dismiss"],
      type: "warning",
      message: m,
    });
  };

  const changePatient = (patient) => {
    setCurrentPatient(patient);
    // let pet_list = document.getElementsByClassName("patient-name");
    // [].forEach.call(pet_list, function (card) {
    //     card.classList.remove("selected")
    // });
    // document.getElementById(patient._id).classList.remove("not-selected");
    // document.getElementById(patient._id).classList.add("selected");
  };
  const handleSubmit = async (e) => {
    if (
      !currentPatient ||
      !vet ||
      !date.current.value ||
      !reason.current.value ||
      !remark.current.value
    ) {
      alertbox("Please fill all the fields");
      return;
    } else if (owner === "") {
      alertbox("Please select the owner");
      return;
    }
    e.preventDefault();
    let appointment = {
      patient: currentPatient._id,
      owner: owner.value,
      veternarian: vet,
      reason: reason.current.value,
      remark: remark.current.value,
      datetime: date.current.value,
    };
    console.log(appointment);
    const result = await appointmentStore.create(appointment);
    if (result) {
      // window.location.href = "/dashboard";
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    const getData = async () => {
      setDoctors(await veternarianStore.readAll());
    };
    getData();
  }, []);

  useEffect(() => {
    if (selectedpet) {
      setCurrentPatient(patients[selectedpet.value]);
    }
  }, [selectedpet, patients]);

  useEffect(() => {
    const updatePets = async () => {
      if (owner !== "") {
        let pets = await patientStore.getPets(owner.value);
        setPatients(pets);
        var opts = [];
        pets.forEach((pet, i) => {
          opts.push({ value: i, label: pet.name });
        });
        setOptions(opts);
      }
    };
    updatePets();
  }, [owner]);

  return (
    <div className="outer">
      <div className="lheader">
        <div
          onClick={() => {
            navigate("/dashboard");
          }}
          className="back-div"
        >
          <img src={backIcon} alt="back"></img>
        </div>
        <Header />
      </div>
      <div className="lout">
        <Sidebar currentTab={3} />

        <div className="cont-out">
          <h1>Book A Visit</h1>
          <div className="cont-in">
            <div className="pet-names">
              <p className="sub-heading-book">Select an owner : </p>
              <AsyncSelect
                defaultOptions
                loadOptions={promiseOptionsOwners}
                onChange={handleAsyncSelectOwner}
                isSearchable={true}
                styles={customStyles}
              />
            </div>
            {patients.length !== 0 && (
              <div className="pet-names">
                <p className="sub-heading-book">Select a patient :</p>
                {/* <select name="doctor" id="cars" value={vet} onChange={e => setCurrentPatient(patients[e.target.value])}>
                            <option selected disabled>Select a pet</option>
                            {patients.map((patient,i) => <option value={i}>{patient.name}</option>)}
                </select>  */}
                {options.length !== 0 && (
                  <Select
                    className="selectbar"
                    defaultValue={selectedpet}
                    options={options}
                    onChange={setSelectedpet}
                    styles={customStyles}
                  />
                )}
              </div>
            )}

            <div className="all-info">
              {currentPatient && (
                <div className="patient-row">
                  <div className="pet-row">
                    <p className="pet-detail">Pet Name : </p>
                    <p>{currentPatient.name}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Species : </p>
                    <p>{currentPatient.species}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Age : </p>
                    <p>{currentPatient.age}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Sex : </p>
                    <p>{currentPatient.sex}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Body Weight : </p>
                    <p>{currentPatient.bodyweight}</p>
                  </div>
                  <div className="pet-row">
                    <p className="pet-detail">Body Color : </p>
                    <p>{currentPatient.color}</p>
                  </div>
                </div>
              )}
              {doctors.length === 0 && (
                <div className="doctor-row">
                  <p className="bold-text">No Doctors to Show</p>
                </div>
              )}
              {doctors.length !== 0 && currentPatient && (
                <div className="doctor-row">
                  <div className="form-group">
                    <label for="doctor">Doctor's Name:</label>
                    <select
                      name="doctor"
                      className="form-control"
                      id="cars"
                      onChange={(e) => setVet(e.target.value)}
                    >
                      <option selected disabled>
                        Select a Doctor
                      </option>
                      {doctors.map((doctor) => (
                        <option value={doctor._id}>{doctor.name} - {doctor.speciality}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label for="reason">Reason Of Visit:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Reason of Visit"
                      name="reason"
                      id="reason"
                      ref={reason}
                    />
                  </div>
                  <div className="form-group">
                    <label for="remarks">Special Remarks:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Special Remarks"
                      name="remarks"
                      id="remarks"
                      ref={remark}
                    />
                  </div>
                  <div className="form-group">
                    <label for="remarks">Appointment Date: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Appointment Date"
                      name="datetime"
                      id="datetime"
                      onFocus={(e) => (e.target.type = "datetime-local")}
                      ref={date}
                    />
                  </div>
                </div>
              )}
              <div className="empty-div"></div>
            </div>
            {/* <button onClick={() =>navigate("/dashboard")}>Back</button> */}
            {
              <button
                type="button"
                className="button-end"
                onClick={handleSubmit}
              >
                Book Appointment
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

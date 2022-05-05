import React from "react";
import patientStore from "../db/stores/patient";
import ownerStore from "../db/stores/owner";
import SpeciesStore from "../db/stores/species";
import vaccineStore from "../db/stores/vaccine";
import { useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async";
import { createFilter } from "react-select";
import Select from "react-select";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./styles/Addpatient.css";
import backIcon from "../assets/arrow.png";
const { dialog, BrowserWindow } = window.require("electron").remote;

export default function Addpatient() {
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
      backgroundColor: "transparent",
      marginBottom: "0.8rem",
      marginTop: "0.4rem",
    }),

    clearIndicator: () => ({
      color: "grey",
      paddingRight: "10px",
    }),
  };

  const [owner, setOwner] = useState("");
  const [selectedSpecies, SetselectedSpecies] = useState("");
  const [gender, SetGender] = useState("");
  const navigate = useNavigate();

  const alertbox = (m) => {
    const window = BrowserWindow.getFocusedWindow();
    dialog.showMessageBox(window, {
      title: "  Alert",
      buttons: ["Dismiss"],
      type: "warning",
      message: m,
    });
  };

  const name = useRef();

  const age = useRef();

  const history = useRef();

  const bodyweight = useRef();

  const color = useRef();

  const fertility = useRef();

  const [vaccinations, setVaccinations] = useState([]);

  const vaccineName = useRef();
  const boosterName = useRef();

  const vaccineDate = useRef();

  const BoosterDate = useRef();

  const [profile, setProfile] = useState("");

  const [open, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (gender === "") {
      alertbox("Please select the pet's gender");
    } else if (owner === "") {
      alertbox("Please select an owner");
    } else if (selectedSpecies === "") {
      alertbox("Please select an species");
    }

    const patient = {
      name: name.current.value,
      age: age.current.value,
      sex: gender.value,
      species: selectedSpecies.value,
      color: color.current.value,
      fertility: fertility.current.value,
      bodyweight: bodyweight.current.value,
      owner: owner.value,
      history:history.current.value,
      profile: profile,
    };

    let result = await patientStore.create(patient);

    for (let i = 0; i < vaccinations.length; i++) {
      const vaccination = {
        name: vaccinations[i].name,
        datetime: vaccinations[i].datetime,
        boostername: vaccinations[i].boostername,
        boosterdatetime: vaccinations[i].boosterdatetime,
        patient: result._id,
      };

      await vaccineStore.create(vaccination);
    }
    //  window.location.href = "/dashboard";
    navigate("/dashboard");
  };

  const addVaccine = () => {
    if (vaccineDate.current.value !== "" && BoosterDate.current.value !== "") {
      let formattedDate = new Date(vaccineDate.current.value);

      let formattedBoosterDate = new Date(BoosterDate.current.value);
      const temp = {
        name: vaccineName.current.value,
        datetime: formattedDate.toLocaleDateString(),
        boostername: boosterName.current.value,
        boosterdatetime: formattedBoosterDate.toLocaleDateString(),
      };
      setVaccinations([...vaccinations, temp]);
      setOpen(false);
    }
  };

  function fileclick(e) {
    setProfile(e.target.files[0].path);
  }

  function removevaccine(i) {
    const temp = [...vaccinations];
    temp.splice(i, 1);
    setVaccinations(temp);
  }

  async function handleAsyncSelectSpecies(event) {
    SetselectedSpecies(event);
  }

  function handleAsyncSelectOwner(event) {
    setOwner(event);
  }

  function handleAsyncSelectGender(event) {
    SetGender(event);
  }

  async function handleOnCreateAsyncSelectOwner(event) {
    const result = await SpeciesStore.create({ name: event });
    SetselectedSpecies({ value: event, label: event });
  }

  const promiseOptionsSpecies = async (inputValue) => {
    return SpeciesStore.readAll().then((datatemp) => {
      return datatemp.map((temp) => {
        return { value: temp.name, label: temp.name };
      });
    });
  };

  const promiseOptionsOwners = async (inputValue) => {
    return ownerStore.readAll().then((datatemp) => {
      return datatemp.map((temp) => {
        return { value: temp._id, label: `${temp.name} - ${temp.phone}` };
      });
    });
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const filterConfig = {
    ignoreCase: false,
    ignoreAccents: false,
    trim: false,
    matchFromStart: false,
    stringify: (option) => `${option.label}`,
  };

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
        <Sidebar currentTab={100} />
        <div className="cont-out">
          <h1>New Pet Registration</h1>
          <div className="cont-in">
            <form onSubmit={handleSubmit}>
              <div className="formall">
                <div className="first">
                  <label for="doctor">Owner's Email:</label>
                  {/* {!profile && <div className="withoutimg">
                            <input id ="fileselect" type="file" onChange={(e)=>{fileclick(e)}}/>
                            <p>Add Photo</p>
                        </div>}
                        {profile && <div className="withimg">
                            <img src={`file://${profile}`} alt="profile"></img>
                        </div>} */}
                  {!profile && (
                    <input
                      id="fileselect"
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      onChange={(e) => {
                        fileclick(e);
                      }}
                    />
                  )}
                  {profile !== "" && (
                    <img
                      src={`file://${profile}`}
                      alt="profile"
                      className="profile-upload"
                    ></img>
                  )}
                  {profile === "" && <p className="bold-text">Add Photo</p>}
                  {profile !== "" && (
                    <p>
                      {profile.substring(
                        Math.max(
                          profile.lastIndexOf("/") + 1,
                          profile.lastIndexOf("\\") + 1
                        ),
                        profile.length
                      )}{" "}
                      <span
                        onClick={() => {
                          setProfile("");
                        }}
                      >
                        X
                      </span>
                    </p>
                  )}
                </div>

                <div className="second">
                  <div className="form-group">
                    <label>Name :</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      ref={name}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Age :</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Age"
                      ref={age}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Species :</label>
                    <AsyncCreatableSelect
                      value={selectedSpecies}
                      filterOption={createFilter(filterConfig)}
                      defaultOptions
                      loadOptions={promiseOptionsSpecies}
                      createOptionPosition={"first"}
                      onChange={handleAsyncSelectSpecies}
                      onCreateOption={handleOnCreateAsyncSelectOwner}
                      styles={customStyles}
                      isSearchable={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Owner :</label>
                    <AsyncSelect
                      defaultOptions
                      loadOptions={promiseOptionsOwners}
                      onChange={handleAsyncSelectOwner}
                      styles={customStyles}
                      isSearchable={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Sex : </label>
                    <Select
                      options={genderOptions}
                      onChange={handleAsyncSelectGender}
                      styles={customStyles}
                    />
                  </div>
                  <div className="form-group">
                    <label>Body Weight(in Kgs) :</label>
                    <input
                      type="number"
                      step="0.1"
                      className="form-control"
                      placeholder="Body Weight"
                      ref={bodyweight}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Body Color :</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Body Color"
                      ref={color}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>History:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="History"
                      ref={history}
                      required
                    />
                  </div>
                  {/* <div className="form-group">
                            <label>Health</label>
                            <input type="text" className="form-control" placeholder="Health" ref={health} onChange={e => setHealth(e.target.value)} required/>
                        </div> */}
                </div>

                <div className="third">
                  <div className="form-group">
                    <label>Castrated / Spayed: </label>
                    <input
                      type="radio"
                      id="fertility-yes"
                      name="fertility-radio"
                      value="yes"
                      ref={fertility}
                      required
                    />
                    <label for="fertility-yes">Yes</label>
                    <input
                      type="radio"
                      id="fertility-no"
                      name="fertility-radio"
                      value="no"
                      ref={fertility}
                    />
                    <label for="fertility-no">No</label>
                    {/* <input type="text" className="form-control" value={fertility} onChange={e => setFertility(e.target.value)} /> */}
                  </div>

                  <p className="sub-heading">Vaccination Chart</p>
                  <div className="vaccinations">
                    {vaccinations.length !== 0 &&
                      vaccinations.map((vaccination, i) => (
                        <div className="vaccinationCard" key={vaccination._id}>
                          <button
                          className="removeButtonFload"
                          onClick={() => removevaccine(i)}
                        >X
                        </button>
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
                    <div
                      className="vaccinationCard clickable-div"
                      onClick={() => setOpen((o) => !o)}
                    >
                      <p>
                        Add More{" "}
                        <span className="bold-text plus-symbol">+</span>
                      </p>
                    </div>
                    {/* <button type="button" className="button button-end" onClick={() => setOpen(o => !o)}>Add Vaccine</button> */}
                    <Popup
                      open={open}
                      closeOnDocumentClick
                      onClose={closeModal}
                      position="right center"
                      modal
                    >
                      <div className="popup-container">
                        <div className="popup-btn-container">
                          <p>Vaccination Form</p>
                          <button className="close" onClick={closeModal}>
                            {" "}
                            &times;{" "}
                          </button>
                        </div>
                        <div className="popup-form">
                          <div className="popup-form-group">
                            <label>Vaccine Name :</label>
                            <input
                              type="text"
                              className="popup-form-control"
                              placeholder="Vaccine name"
                              ref={vaccineName}
                            />
                          </div>
                          <div className="popup-form-group">
                            <label>Vaccine Date :</label>
                            <input
                              type="text"
                              className="popup-form-control"
                              placeholder="Date of Vaccinations"
                              onFocus={(e) => (e.target.type = "date")}
                              ref={vaccineDate}
                            />
                            {/* <input type="date" className="popup-form-control" value={vaccineDate} onChange={e => setVaccineDate(e.target.value)} /> */}
                          </div>
                          <div className="popup-form-group">
                            <label>Booster Dose:</label>
                            <input
                              type="text"
                              className="popup-form-control"
                              placeholder="Vaccine name"
                              ref={boosterName}
                            />
                          </div>
                          <div className="popup-form-group">
                            <label>Booster Date :</label>
                            <input
                              type="text"
                              className="popup-form-control"
                              placeholder="Date of Vaccinations"
                              onFocus={(e) => (e.target.type = "date")}
                              ref={BoosterDate}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={addVaccine}
                          className="popup-form-btn"
                        >
                          Add
                        </button>
                      </div>
                    </Popup>
                  </div>
                </div>
              </div>
              <div className="submit-div">
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
              {/* <button type="button" onClick={() => setRedirect("/dashboard")}>Go Back</button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import appointmentsStore from "../db/stores/appointments";
import ownerStore from "../db/stores/owner";
import { useEffect, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Pet from "./Pet";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import PatientStore from "../db/stores/patient";
import SpeciesStore from "../db/stores/species";

export default function AllAnimals() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
//   const [selectSpecicies, setSelectSpecies] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const getData = async () => {


    // let species = await SpeciesStore.readAll();
    // let options = species.map((sName) => {
    //   return { value: sName.name, label: sName.name };
    // });

  
    // setSelectOptions(options);
    let pets = await PatientStore.readAll();
    setAnimals(pets);
  };



  const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    resolve(SpeciesStore.readAll());
  });

  async function handleSelectOnChange(event) {
    setAnimals((prev) => {
      const temp = prev.filter((temp) => temp.species === event.value);
      return temp;
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="outer">
      <div className="lheader">
        <div
          onClick={() => {
            navigate("");
          }}
          className="back-div"
        >
          <img src={backIcon} alt="back"></img>
        </div>
        <Header />
      </div>
      <div className="lout">
        <Sidebar currentTab={10} />
        <div className="cont-out">
          <h1>All Animals</h1>
          <div className="cont-in">
            <h3>Animals</h3>

             {animals.length !== 0 && (
             <AsyncSelect 
             defaultOptions
               className="selectbar"
               loadOptions={promiseOptions}
               getOptionLabel={e => e.name}
                 getOptionValue={e => e.name}
               onChange={handleSelectOnChange}
             />
            )}
{/* 
            {animals.length !== 0 && (
              <Select
                className="selectbar"
                options={selectOptions}
                onChange={handleSelectOnChange}
              />
            )} */}
            <div className="pets">
              {animals.length !== 0 &&
                animals.map((pet) => <Pet key={pet._id} pet={pet} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

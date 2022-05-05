import React from "react";
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import Pet from "./Pet";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import PatientStore from "../db/stores/patient";
import SpeciesStore from "../db/stores/species";
import { createFilter } from "react-select";

export default function AllAnimals() {
  const navigate = useNavigate();

  const [animals, setAnimals] = useState([]);
  const [allAnimals, setAllAnimals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    setAllAnimals(pets);
    setIsLoading(false)
  };



  const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    resolve(SpeciesStore.readAll());
  });

  async function handleSelectOnChange(eventTemp) {
    setIsLoading(true);
    setAnimals((prev) => {
      const temp = allAnimals.filter((temp) => {
       return temp.species === eventTemp.name});
      return temp;
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);



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
        <Sidebar currentTab={10} />
        <div className="cont-out">
          <h1>All Animals</h1>
          <div className="PrintButtonDiv">
                <button className="PrintButton" onClick={()=>{window.print()}}>
                  Print
                </button>
              </div>
          <div className="cont-in">
            
            {animals.length === 0 && (
           <h3>No animals to show</h3>
            )}
             {animals.length !== 0 && (
             <AsyncSelect 
             defaultOptions
               className="selectbar"
               loadOptions={promiseOptions}
               getOptionLabel={e => e.name}
                 getOptionValue={e => e.name}
               onChange={handleSelectOnChange}
               filterOption={createFilter(filterConfig)}
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

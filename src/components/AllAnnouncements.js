import React from "react";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import announcementsStore from "../db/stores/Announcements";
import adminStore from "../db/stores/admin";

export default function AllAnnouncements() {
  const navigate = useNavigate();
  const [announcementsList, setAnnouncementList] = useState([]);
  const [open,setOpen]=useState(false);
  const [openCreate,setOpenCreate]=useState(false);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [name,setName]=useState("");
  const closeModal = () => setOpen(false);
  const closeCreateModal = () => setOpenCreate(false);


   async function generatePopUp(Data){
    setTitle(Data.title);
    setDescription(Data.description);
    let tempName=await adminStore.read(Data.by)
    setName(tempName.name);
    setOpen(true);
   }
  

  const getData = async () => {
    let user = localStorage.getItem("admin");
    console.log("Admin ..................");
    console.log(user);
    let temp = await announcementsStore.readAll();
    setAnnouncementList(temp);
  };

  useEffect(() => {
    getData();
  }, []);

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
        <Sidebar currentTab={11} />
        <div className="cont-out">
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
                  <h3>{title}</h3>
                </div>
                <div className="popup-form-group">
                  <p>{description}</p>
                </div>
                <div className="popup-form-group">
                  <p>{name}</p>
                </div>
              </div>
            </div>
          </Popup>
          <Popup
            open={openCreate}
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
                            <label>Title :</label>
                            <input
                              type="text"
                              className="popup-form-control"
                              placeholder="Vaccine name"
                              ref={vaccineName}
                            />
                          </div>
                          <div className="popup-form-group">
                            <label>Description :</label>
                            <input
                              type="text"
                              className="popup-form-control"
                              placeholder="Vaccine name"
                              ref={vaccineName}
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
          <h1>All Announcements</h1>
          <div className="cont-in">
            <div className="Announcements">
              {announcementsList.length !== 0 &&
                announcementsList.map((annTemp) => (
                  <div key={annTemp._id} className="AnnouncementDiv" onClick={() => {generatePopUp({title:annTemp.title,description:annTemp.description,by:annTemp.by})}}>
                    <h3>{annTemp.title}</h3>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

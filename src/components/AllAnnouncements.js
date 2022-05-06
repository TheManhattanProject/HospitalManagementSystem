import React from "react";
import Popup from "reactjs-popup";
import { useEffect, useState, useRef } from "react";
import "./styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import announcementsStore from "../db/stores/Announcements";
import adminStore from "../db/stores/admin";
import "reactjs-popup/dist/index.css";

export default function AllAnnouncements() {
  const navigate = useNavigate();
  const [announcementsList, setAnnouncementList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [adminID, setAdminID] = useState("");
  const closeModal = () => setOpen(false);
  const closeCreateModal = () => setOpenCreate(false);

  async function addAnnouncement() {
    if (titleRef.current.value !== "" && descriptionRef.current.value !== "") {
      const createdAnnouncement = await announcementsStore.create({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        by: adminID,
      });
      
      setOpenCreate(false);
      await getData();
    }
  }

  async function generatePopUp(Data) {
    setTitle(Data.title);
    setDescription(Data.description);
    let tempName = await adminStore.read(Data.by);
    setName(tempName.name);
    setOpen(true);
  }

  const getData = async () => {
    let user = localStorage.getItem("admin");
    let vet = localStorage.getItem("vet");
    if(user!==null){
      setAdminID(user);
    }
    
    let temp = await announcementsStore.readAll();
    temp=temp.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
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
                <p>Announcement Detail</p>
                <button className="removeButton" onClick={closeModal}>
                 X
                </button>
              </div>
              <div className="DivInPopUp">
              <h3 className="HeadingInPopUp">{title}</h3>
              <p className="ParagraphInPopUp">{description}</p>
              <p className="ParagraphInPopUp">-<i>{name}</i></p>
              </div>
            </div>
          </Popup>
          <Popup
            open={openCreate}
            closeOnDocumentClick
            onClose={closeCreateModal}
            position="right center"
            modal
          >
            <div className="popup-container">
              <div className="popup-btn-container">
                <p>Announcement Form</p>
                <button className="close" onClick={closeCreateModal}>
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
                    placeholder="title"
                    ref={titleRef}
                  />
                </div>
                <div className="popup-form-group">
                  <label>Description :</label>
                  <input
                    type="text"
                    className="popup-form-control"
                    placeholder="description"
                    ref={descriptionRef}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addAnnouncement}
                className="popup-form-btn"
              >
                Add
              </button>
            </div>
          </Popup>
          <h1>All Announcements</h1>
          <div className="PrintButtonDiv">
            <button
              className="PrintButton"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </button>
          </div>
          <div>
           {adminID!=="" && <button
              // className=""
              onClick={() => {
                setOpenCreate(true);
              }}
            >
              Create
            </button>}
          </div>
          <div className="cont-in">
            <div className="Announcements">
              {announcementsList.length !== 0 &&
                announcementsList.map((annTemp) => {
                 return <div
                    key={annTemp._id}
                    className="AnnouncementDiv"
                    onClick={() => {
                      generatePopUp({
                        title: annTemp.title,
                        description: annTemp.description,
                        by: annTemp.by,
                      });
                    }}
                  >
                    <h3>{annTemp.title}</h3>
                  </div>;
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

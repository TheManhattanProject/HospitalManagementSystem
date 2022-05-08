import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import prescriptionStore from "../db/stores/prescriptions";
import patientStore from "../db/stores/patient";
import appointmentStore from "../db/stores/appointments";
import veternarianStore from "../db/stores/veternarian";
import filesStore from "../db/stores/files";
import treatmentStore from "../db/stores/treatment";
import investigationStore from "../db/stores/investigation";
import vaccineStore from "../db/stores/vaccine";
import vitalStore from "../db/stores/vitals";
import commentStore from "../db/stores/comments";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import backIcon from "../assets/arrow.png";
import "./styles/DetailedPrescription.css";

const { ipcRenderer } = window.require("electron");

export default function DetailedPrescription() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pid = searchParams.get("id");
  const [appointment, setAppointment] = useState();
  const [reports, setReports] = useState([]);
  const [comments, setComments] = useState([]);
  const [vitals, setVitals] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);

  const openFile = (file) => {
    console.log(ipcRenderer);
    ipcRenderer.invoke("open-file", file);
    console.log(file);
  };

  const formattedDate = (date) => {
    let d = new Date(date);
    return d.toLocaleDateString();
  };

  useEffect(() => {
    const getData = async () => {
      let appt = await appointmentStore.read(pid);
      setAppointment(appt);
      appt.veternarian = await veternarianStore.getVeterinarian(
        appt.veternarian
      );
      appt.prescription = await prescriptionStore.getPrescription(
        appt.prescription
      );
      appt.patient = await patientStore.getPatient(appt.patient);
      setAppointment(appt);
      if (appt.prescription) {
        setPhotos(await filesStore.getPhotos(appt.prescription._id));
        setReports(await investigationStore.getReports(appt.prescription._id));
        setTreatments(
          await treatmentStore.getTreatments(appt.prescription._id)
        );
        setComments(await commentStore.getComments(appt.prescription._id));
        setVitals(await vitalStore.getVitals(appt.prescription._id));
      }
      if (appt.patient) {
        setVaccinations(await vaccineStore.getVaccinations(appt.patient._id));
      }
    };
    localStorage.getItem("user")
      ? getData()
      : localStorage.getItem("vet")
      ? getData()
      : navigate("/");
  }, [pid]);

  return (
    <div className="outer">
      <div className="lheader">
        {appointment && (
          <div
            onClick={() => {
              navigate(
                `/patient/history?id=${appointment.patient._id}&apptid=${appointment._id}`
              );
            }}
            className="back-div"
          >
            <img src={backIcon} alt="back"></img>
          </div>
        )}
        <Header />
      </div>
      <div className="lout">
        <Sidebar currentTab={100} />
        <div className="cont-out">
          <h1>Detailed Prescription</h1>
          <div className="cont-in">
            {appointment && (
              <div className="all-info">
                <div className="patient-row">
                  <div className="pet-row">
                    <p className="pet-detail">Pet Name :</p>
                    <p>{appointment.patient.name}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Species :</p>
                    <p>{appointment.patient.species}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Age :</p>
                    <p>{appointment.patient.age}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Sex :</p>
                    <p>{appointment.patient.sex}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Body Weight : </p>
                    <p>{appointment.patient.bodyweight}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Body Color : </p>
                    <p>{appointment.patient.color}</p>
                  </div>

                  <div className="pet-row">
                    <p className="pet-detail">Initial History :</p>
                    <p>{appointment.patient.history}</p>
                  </div>
                </div>

                <div className="vaccination-row">
                  <p className="sub-heading">Vaccination Chart:</p>
                  {vaccinations.length !== 0 && (
                    <div className="vaccinations">
                      {vaccinations.map((vaccination, i) => (
                        <div className="vaccinationCard" key={vaccination._id}>
                          <p className="bold-text">{vaccination.name}</p>
                          <p className="bold-text">{vaccination.datetime}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* {vaccinations.length!==0 && <div className="col-md-4">
                    <p>Vaccination Chart:</p>
                    <div className="vaccinations">
                        {vaccinations.map(v => (
                        <div className="vaccination" key={v._id}>
                            <p>{v.name}</p>
                            <p>{v.datetime}</p>
                        </div>
                        ))}
                    </div>
                </div>} */}

                <div className="patient-row">
                  <p className="sub-heading">Last Visit:</p>
                  {appointment && (
                    <div className="patient-row">
                      {appointment.veternarian && (
                        <div className="pet-row">
                          <p className="pet-detail-long">Doctor's Name: </p>
                          <p>{appointment.veternarian.name}</p>
                        </div>
                      )}
                      <div className="pet-row">
                        <p className="pet-detail-long">Reason Of Visit: </p>
                        <p>{appointment.reason}</p>
                      </div>
                      <div className="pet-row">
                        <p className="pet-detail-long">Date Of Visit: </p>
                        <p>{formattedDate(appointment.datetime)}</p>
                      </div>

                      <div className="pet-row">
                        <p className="pet-detail-long">Diagnosis : </p>
                        {appointment.prescription && (
                          <p>{appointment.prescription.diagnosis}</p>
                        )}
                      </div>

                      <div className="pet-row">
                        <p className="pet-detail-long">Next Date Of Visit : </p>
                        {appointment.prescription && (
                          <p>
                            {formattedDate(
                              appointment.prescription.nextAppointment
                            )}
                          </p>
                        )}
                      </div>

                      {/* {appointment.prescription && <button onClick={()=>{router.push(`/prescription?id=${appointment._id}`)}}>View Full Prescription</button>} */}
                    </div>
                  )}

                  {/* <p>Photos</p>
                    {photos.length!==0 && photos.map(report => (<p>{report.title}</p>))} */}
                </div>
                <div className="empty-div"></div>
              </div>
            )}

            <div className="investigations-div">
              <h3>Vitals</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {vitals.length !== 0 &&
                    vitals.map((t, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{t.vName}</td>
                        <td>{t.vValue}</td>
                        <td>{t.vRemark}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="investigations-div">
              <h3>Investigation Reports</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Investigation / Lab Report</th>
                    <th>File</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.length !== 0 &&
                    reports.map((t, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>
                          <input type="text" value={t.name} />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => openFile(t.path)}
                          >
                            {t.filename}
                          </button>
                        </td>
                        <td>
                          <input type="text" value={t.remarks} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="investigations-div">
              <h3>Treatments</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Drug Name / Treatment</th>
                    <th>Frequency</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.length !== 0 &&
                    treatments.map((t, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{t.name}</td>
                        <td>
                          <div className="radio-inp">
                            <label>Morning</label>
                            {t.frequency[0] === "1" ? (
                              <input
                                type="checkbox"
                                checked="checked"
                                disabled
                              />
                            ) : (
                              <input type="checkbox" disabled />
                            )}
                            <label>Afternoon</label>
                            {t.frequency[1] === "1" ? (
                              <input
                                type="checkbox"
                                checked="checked"
                                disabled
                              />
                            ) : (
                              <input type="checkbox" disabled />
                            )}
                            <label>Night</label>
                            {t.frequency[2] === "1" ? (
                              <input type="checkbox" disabled />
                            ) : (
                              <input type="checkbox" disabled />
                            )}
                          </div>
                        </td>
                        <td className="td1-4">
                          <input type="number" value={t.days} disabled />
                        </td>
                        <td>{t.remarks}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="investigations-div">
              <h3>Remarks </h3>
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.length !== 0 &&
                    comments.map((t, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{t.remarks}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="investigations-div">
              <h3>Additional Images</h3>
              <table>
                <thead>
                  <tr>
                    <th>Sl No.</th>
                    <th>Investigation / Lab Image</th>
                    <th>File</th>
                  </tr>
                </thead>
                <tbody>
                  {photos.length !== 0 &&
                    photos.map((t, i) => (
                      <tr key={t._id}>
                        <td>{i + 1}</td>
                        <td>
                          <input type="text" value={t.title} />
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => openFile(t.path)}
                          >
                            {t.filename}
                          </button>
                        </td>
                        {/* <td><input type="text" value={t.file}/></td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* {appointment && <button type='button' onClick={() => navigate(`/patient/history?id=${appointment.patient._id}&apptid=${appointment._id}`)}>Go Back</button>} */}
          </div>
        </div>
      </div>
    </div>
  );
}

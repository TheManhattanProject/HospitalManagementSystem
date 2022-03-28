import {useEffect, useState,useRef} from 'react';
import inventoryStore from '../db/stores/inventory';
import Popup from 'reactjs-popup';
import {Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
import Select from "react-select"



export default function Inventory() {

    const [redirect, setRedirect] = useState();
    const [category, setCategory] = useState('medicine');
    const [items, setItems] = useState([]);
    const itemname = useRef();
    const itemremark = useRef();
    const [open, setOpen] = useState(false);  
    const [admin, setAdmin] = useState();
    const closeModal = () => setOpen(false);
    const updateItem = (item) => {
        console.log(item);
    }

    useEffect(() => {
        if (!localStorage.getItem('vet')){
            let user = localStorage.getItem("admin");
            if (user){
                setAdmin(user);
            } else{
                setRedirect("/vet/login");
            }
        }
        const getData = async () => {
            let items = await inventoryStore.getItems(category);
            setItems(items);
        }
        getData();
    }, [category]);

    const additem = async(e) => {
        e.preventDefault();
        let item = {
            name: itemname.current.value,
            remark: itemremark.current.value,
            category: category
        }

        await inventoryStore.create(item);
        setItems([...items, item]);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    const options =[ 
        { value: 'medicine', label: 'Medicine' },
        { value: 'stretcher', label: 'Stretchers' },
        { value: 'lab', label: 'Laboratory' },
        { value: 'equipment', label: 'Equipment' },
        { value: 'other', label: 'Other' }
    ]


    return (
        <div class="outer">
            <div className="lheader">
                <div onClick={()=>{setRedirect("/vet/dashboard")}} className='back-div'>
                    <img src={backIcon} alt="back"></img>
                </div>
                <Header />
            </div>
            <div className="lout">
            <Sidebar currentTab={7}/>
            <div className="cont-out">
            <h1>Inventory</h1>
            <div className="cont-in">
            <div className="categories">
            <Select className ="selectbar" defaultValue={category} options={options} onChange={setCategory}/>
                {/* <button type="button" onClick={(e) => setCategory('medicine')}>Medicines</button>
                <button type="button" onClick={(e) => setCategory('lab')}>Laboratory</button>
                <button type="button" onClick={(e) => setCategory('equipment')}>Equipments</button>
                <button type="button" onClick={(e) => setCategory('stretcher')}>Stretchers</button> */}
            </div>
            <table>
                <thead>
                    <th>Sl. No</th>
                    <th>Lab Test / Chemicals</th>
                    <th>Quantity</th>
                    <th>Remarks</th>
                    <th></th>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.remarks}</td>
                            <td><button type="button" onClick={() => updateItem(item._id)}>Update Record</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {admin && <button type="button" className="button" onClick={() => setOpen(o => !o)}>Add Item</button>}

            {admin && <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
                                <div className="popup-container">
                                <div className="popup-btn-container">
                                    <p>Vaccination Form</p>
                                    <button className="close" onClick={closeModal}>  &times;  </button>
                                </div>
                                    <div className="popup-form">
                                        <div className="popup-form-group">
                                            <label>Item Name :</label>
                                            <input type="text" className="popup-form-control" placeholder="Item name" ref={itemname} />
                                        </div>
                                        <div className="popup-form-group">
                                            <label>Item Count :</label>
                                            <input type="number" className="popup-form-control" ref={itemremark}/>
                                            {/* <input type="date" className="popup-form-control" value={vaccineDate} onChange={e => setVaccineDate(e.target.value)} /> */}
                                        </div>
                                    </div>
                                    <button type="button" onClick ={additem} className="popup-form-btn">Add</button>
                                </div>
                                </Popup>}
                            {/* </Popup><Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
            <div>
            <button className="close" onClick={closeModal}>  &times;  </button>
                <div>
                    <label>Item Name</label>
                    <input type="text" className="form-control" value={itemname} onChange={e => setItemname(e.target.value)} />
                    <input type="number" className="form-control" value={itemremark} onChange={e => setItemremark(e.target.value)} />
                    <button type="button" onClick ={additem} className="btn btn-primary">Add</button>
                </div>
            </div>
            </Popup> */}
            
            {/* <button type="button" className="button" onClick={() => setRedirect('/vet/dashboard')}>Back</button> */}

        </div>
        </div>
        </div>
        </div>
    );
}
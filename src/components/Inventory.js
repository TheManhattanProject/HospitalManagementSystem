import {useEffect, useState,useRef} from 'react';
import inventoryStore from '../db/stores/inventory';
import Popup from 'reactjs-popup';
import {Navigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import backIcon from "../assets/arrow.png"
import Select from "react-select"
import "./styles/Inventory.css"
const { dialog, BrowserWindow } = window.require('electron').remote

export default function Inventory() {

    const [redirect, setRedirect] = useState();
    const [category, setCategory] = useState();
    const [items, setItems] = useState([]);
    const [itemname, setItemname] = useState();
    const [itemquantity, setItemquantity] = useState();
    const [itemremark, setItemremark] = useState();
    const [open, setOpen] = useState(false);  
    const [admin, setAdmin] = useState();
    const [index, setIndex] = useState(null);
    const closeModal = () => setOpen(false);

    const alertbox = (m) => {
        const window = BrowserWindow.getFocusedWindow();
        dialog.showMessageBox(window, {
          title: '  Alert',
          buttons: ['Dismiss'],
          type: 'warning',
          message: m,
        });
      }

    useEffect(() => {
            let vet = localStorage.getItem("vet");
            let admin = localStorage.getItem("admin");
            setAdmin(admin);
            if (!vet && !admin) {
                setRedirect("/vet/login");
            }
        const getData = async () => {
            let items = await inventoryStore.getItems(category);
            setItems(items);
        }
        getData();
    }, [category]);

    const additem = async(e) => {
        e.preventDefault();
        if (!itemname || !itemquantity || !itemremark) {
            alertbox("Please fill all the fields");
            return;
        }
        let item = {
            name: itemname,
            remark: itemremark,
            quantity: itemquantity,
            category: category,
        }

        await inventoryStore.create(item);
        setItems([...items, item]);
    }

    const openUpdateItem = (item, i) => {
        setItemname(item.name);
        setItemremark(item.remark);
        setItemquantity(item.quantity);
        setIndex(i);
        setOpen(o => !o);
    }
    function removeitem(e){
        e.preventDefault();
        let item = items[index];
        inventoryStore.delete(item._id);
        let newItems = items;
        newItems.splice(index, 1);
        setItems(newItems);
        setIndex(null);
        setOpen(o => !o);
    }
    function updateitem(e){
        e.preventDefault();
        if(!itemname || !itemquantity || !itemremark){
            alertbox("Please fill all the fields");
            return;
        }
        let item = items[index];
        item.name = itemname;
        item.remark = itemremark;
        item.quantity = itemquantity;
        inventoryStore.update(item);
        let newItems = items;
        newItems[index] = item;
        setItems(newItems);
        setIndex(null);
        setOpen(o => !o);
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
            <p className="sub-heading-inventory">Select a Category :</p>
            <Select className ="selectbar" defaultValue={category} options={options} onChange={setCategory}/>
                {/* <button type="button" onClick={(e) => setCategory('medicine')}>Medicines</button>
                <button type="button" onClick={(e) => setCategory('lab')}>Laboratory</button>
                <button type="button" onClick={(e) => setCategory('equipment')}>Equipments</button>
                <button type="button" onClick={(e) => setCategory('stretcher')}>Stretchers</button> */}
            </div>
            <table className="inventory-table">
                <thead>
                    <tr>
                    <th className={admin ? "td4-1" : "td3-1"}>Sl. No</th>
                    <th className={admin ? "td4-2" : "td3-2"}>Lab Test / Chemicals</th>
                    <th className={admin ? "td4-3" : "td3-3"}>Quantity</th>
                    <th className={admin ? "td4-4" : "td3-4"}>Remarks</th>
                    {admin && <th className="td4-5"></th>}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.remark}</td>
                            {admin && <td className="button-td"><button type="button" onClick={() => openUpdateItem(item,i)}>Update</button></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            {admin && category && <button type="button" className="button button-end" onClick={() => setOpen(o => !o)}>Add Item</button>}

            {admin && <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
                                <div className="popup-container">
                                <div className="popup-btn-container">
                                    {index ? <p>Update Item</p> : <p>Add Item</p>}
                                    <button className="close" onClick={()=>{setItemname(); setItemremark(); setItemquantity(); setIndex(null);
                                        closeModal();
                                    }}>  &times;  </button>
                                </div>
                                    <div className="popup-form">
                                        <div className="popup-form-group">
                                            <label>Item Name :</label>
                                            <input type="text" className="popup-form-control" placeholder="Item name" value={itemname} onChange={(e)=>setItemname(e.target.value)}  required/>
                                        </div>
                                        <div className="popup-form-group">
                                            <label>Item Quantity :</label>
                                            <input type="number" className="popup-form-control" placeholder="Item quantity" value={itemquantity} onChange={(e)=>setItemquantity(e.target.value)} required/>
                                        </div>
                                        <div className="popup-form-group">
                                            <label>Item Remark :</label>
                                            <input type="text" className="popup-form-control" value={itemremark} onChange={(e)=>setItemremark(e.target.value)} required/>
                                            {/* <input type="date" className="popup-form-control" value={vaccineDate} onChange={e => setVaccineDate(e.target.value)} /> */}
                                        </div>
                                    </div>
                                    {index===null && <button onClick ={additem} className="popup-form-btn">Add</button>}
                                    <div className='up-rem'>
                                    {index!==null && <button onClick ={updateitem} className="popup-form-btn">Update</button>}
                                    {index!==null && <button onClick ={removeitem} className="popup-form-btn">Remove</button>}
                                    </div>
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
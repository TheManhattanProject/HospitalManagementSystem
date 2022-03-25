import {useEffect, useState} from 'react';
import inventoryStore from '../db/stores/inventory';
import Popup from 'reactjs-popup';
import {Navigate } from 'react-router-dom';

export default function Inventory() {

    const [category, setCategory] = useState('medicine');
    const [items, setItems] = useState([]);
    const [itemname, setItemname] = useState();
    const [itemremark, setItemremark] = useState();
    const [open, setOpen] = useState(false);  
    const closeModal = () => setOpen(false);
    const updateItem = (item) => {
        console.log(item);
    }
    const [redirect , setRedirect] = useState();
    useEffect(() => {
        const getData = async () => {
            let items = await inventoryStore.getItems(category);
            setItems(items);
        }
        getData();
    }, [category]);

    const additem = async(e) => {
        e.preventDefault();
        let item = {
            name: itemname,
            remark: itemremark,
            category: category
        }
        await inventoryStore.create(item);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }


    return (
        <div class="container">
            <h1>Inventory</h1>
            <div className="categories">
                <button type="button" onClick={(e) => setCategory('medicine')}>Medicines</button>
                <button type="button" onClick={(e) => setCategory('lab')}>Laboratory</button>
                <button type="button" onClick={(e) => setCategory('equipment')}>Equipments</button>
                <button type="button" onClick={(e) => setCategory('stretcher')}>Stretchers</button>
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
            <button type="button" className="button" onClick={() => setOpen(o => !o)}>Add Item</button>

            <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center" modal>
            <div>
            <button className="close" onClick={closeModal}>  &times;  </button>
                <div>
                    <label>Item Name</label>
                    <input type="text" className="form-control" value={itemname} onChange={e => setItemname(e.target.value)} />
                    <input type="number" className="form-control" value={itemremark} onChange={e => setItemremark(e.target.value)} />
                    <button type="button" onClick ={additem} className="btn btn-primary">Add</button>
                </div>
            </div>
            </Popup>
            <button type="button" className="button" onClick={() => setRedirect('/vet/dashboard')}>Back</button>

        </div>
    );
}
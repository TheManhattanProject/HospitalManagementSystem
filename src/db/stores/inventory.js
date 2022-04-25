import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const inventorySchema= require('../schemas/inventory');
const {remote, ipcRenderer} = window.require("electron");

class InventoryStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(inventorySchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/inventory.db");
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    async validate(data) {
        return await this.schemaValidator(data);
    }

    async create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return await this.db.insert(data);
        }
        return null;
    }

    async read(_id) {
        return await this.db.findOne({_id}).exec()
    }

    async readAll() {
        return await this.db.find()
    }

    async update(id, data){
        const isValid = this.validate(data);
        if(isValid){
            let data_old = await this.read(id);
            data = {...data_old, ...data};
            return await this.db.update({_id: id}, data);
        }
    }

    async delete(id){
        return await this.db.remove({id: id});
    }

    async getMedicines() {
        return await this.db.find({category: 'medicine'});
    }

    async getLabs() {
        return await this.db.find({category: 'lab'});
    }

    async getEquipment() {
        return await this.db.find({category: 'equipment'});
    }

    async getStretchers() {
        return await this.db.find({category: 'stretcher'});
    }

    async getItems(cat) {
        return await this.db.find({category: cat});
    }

    async updateQty(id, qty) {
        let old = await this.read(id);
        old.quantity = Number(old.quantity) + Number(qty);
        console.log(old);
        return await this.db.update({_id: id}, old);
    }
}

export default new InventoryStore();


import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const appointmentsSchema= require('../schemas/appointments');
const veternarianStore = require('./veternarian');
const remote = window.require("electron").remote;

class AppointmentsStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(appointmentsSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/appointments.db");
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
            return await this.db.update({id: id}, data);
        }
    }

    async delete(id){
        return await this.db.remove({id: id});
    }

    async getPastAppointments(id){
        return await this.db.find({owner: id});
    }

    async getHistory(id){
        return await this.db.find({patient: id});
    }
    async getAppointments(id){
        const appointments = await this.db.find({patient: id});
        if (appointments) {
            return appointments;
        }               
        return null;
    }
    async getLastAppointment(id){
        const appointments = await this.getAppointments(id)
        if (appointments.length) {
            let appt = appointments[appointments.length - 1];
            appt.veternarian = await veternarianStore.read(appt.veternarian);
            return appt;
        }               
        return null;
    }
}
export default new AppointmentsStore();

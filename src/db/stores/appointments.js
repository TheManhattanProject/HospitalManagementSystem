
import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const appointmentsSchema= require('../schemas/appointments');
const veternarianStore = require('./veternarian');
const patientStore = require('./patient');
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
    async getVetPets(id){
        const appointments = await this.db.find({veternarian: id});
        let pets =[]
        if (appointments.length) {
            for (let i = 0; i < appointments.length; i++) {
                const pet = await patientStore.read(appointments[i].patient);
                pets.push(pet);
            }
            pets.filter((v,i,a)=>a.findLastIndex(v2=>(v2.place === v.place))===i)
            return pets;
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

    async getVetTodayAppointments(id){
        const appointments = await this.db.find({veternarian: id});
        if (appointments) {
            let today = [];
            let now = new Date();
            for (let i = 0; i < appointments.length; i++) {
                let date = new Date(appointments[i].datetime);
                if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                    today.push(appointments[i]);
                }
            }
            if (today.length) {
                return today;
            }
            return null;
        }               
        return null;
    }
}
export default new AppointmentsStore();

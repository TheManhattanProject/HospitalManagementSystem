
import path from "path";
import patientStore from "./patient";
import veternarianStore from "./veternarian";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const appointmentsSchema= require('../schemas/appointments');
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
            let data_old = await this.read(id);
            data = {...data_old, ...data};
            return await this.db.update({_id: id}, data);
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
        return appointments
    }
    async getVetPets(id){
        const appointments = await this.db.find({veternarian: id});
        let pets =[]
        if (appointments.length>0) {
            for (let i = 0; i < appointments.length; i++) {
                let pet = await patientStore.read(appointments[i].patient);
                console.log(pet)
                pets.push(pet);
            }
            pets = [...new Set(pets)];
            return pets;
        }
        return [];
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
            return today;
        }               
        return [];
    }
}
export default new AppointmentsStore();

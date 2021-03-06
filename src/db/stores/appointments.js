
import path from "path";
import patientStore from "./patient";
import veternarianStore from "./veternarian";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const appointmentsSchema= require('../schemas/appointments');
const remote = window.require("electron").remote;

const compareDates = (a, b) => {
    if (a.datetime < b.datetime) {
        return 1;
    }
    if (a.datetime > b.datetime) {
        return -1;
    }
    return 0;
}

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
        const appointments = await this.db.find({owner: id});
        if (appointments) {
            for (let i = 0; i < appointments.length; i++) {
                appointments[i].datetime = new Date(appointments[i].datetime);
            }
            appointments.sort(compareDates);
            for (let i = 0; i < appointments.length; i++) {
                appointments[i].datetime = appointments[i].datetime.toLocaleDateString();
            }
        }
        return appointments;
    }

    async getHistory(id){
        return await this.db.find({patient: id});
    }
    async getAppointments(id){
        const appointments = await this.db.find({patient: id});
        if (appointments) {
            for (let i = 0; i < appointments.length; i++) {
                appointments[i].datetime = new Date(appointments[i].datetime);
            }
            appointments.sort(compareDates);
            for (let i = 0; i < appointments.length; i++) {
                appointments[i].datetime = appointments[i].datetime.toLocaleDateString();
            }
        }
        return appointments
    }
    async getVetPets(id){
        const appointments = await this.db.find({veternarian: id});
        let pets =[]
        if (appointments.length>0) {
            for (let i = 0; i < appointments.length; i++) {
                let pet = await patientStore.read(appointments[i].patient);
                pets.push(pet);
            }
            pets = pets.filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i)
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
                    appointments[i].datetime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    today.push(appointments[i]);
                }
            }
            today.sort(compareDates);
            return today;
        }               
        return [];
    }
    
    async getFutureAppointments(id){
        const appointments = await this.db.find({veternarian: id});
        let futureappt=[]
        if (appointments) {
            
            
                futureappt = appointments.filter(appt => {
                let date = new Date(appt.datetime);
                let now = new Date();
                return date.getTime() > now.getTime();
            });
            if (futureappt.length > 0) {
                for (let i = 0; i < futureappt.length; i++) {
                    futureappt[i].datetime = new Date(futureappt[i].datetime);
                    futureappt[i].datetime = futureappt[i].datetime.toLocaleDateString([], {hour: '2-digit', minute:'2-digit'});
                }
                futureappt.sort(compareDates);
                return futureappt;
            }
            // appointments.sort(compareDates);
            // for (let i = 0; i < appointments.length; i++) {
            //     appointments[i].datetime = appointments[i].datetime.toLocaleDateString();
            // }
        }
        return appointments;
    }
}
export default new AppointmentsStore();

import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const patientSchema= require('../schemas/patient');
const {remote, ipcRenderer} = window.require("electron");

const appDir = path.join(remote.app.getPath("userData"), "profile_photos");

class PatientStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(patientSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/patient.db");
        this.db = Datastore.create({
            filename: dbPath,
            timestampData: true,
        });
    }

    async validate(data) {
        return await this.schemaValidator(data);
    }

    async create(data) {
        console.log(data);
        const isValid = this.validate(data);
        if (isValid) {
            let doc = await this.db.insert(data);
            if (doc) {
                if (doc.profile) {
                    const filePath = path.join( appDir,  `${doc._id}.jpg` );
                    ipcRenderer.invoke('copy-file', [data.profile, filePath]);
                    data.profile = filePath;
                    await this.db.update({_id: doc._id}, data);
                    doc.profile = filePath;
                    return doc;
                }
            }
            return doc;
        } else {
            return isValid.errors;
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

    async getPets(id){
        return await this.db.find({owner: id});
    }

  async  getPatient(_id){
        const patient = await this.read(_id);
        if(!patient){
            return null;
        }
        return patient;
        
    }

    async getLastPatient(owner_id){
        const patient = await this.db.find({owner: owner_id}).sort({createdAt: -1}).limit(1);
        if(!patient.length){
            return null;
        }
        return patient[0];
    }
}

export default new PatientStore();

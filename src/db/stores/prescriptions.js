import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const prescriptionSchema= require('../schemas/prescriptions');
const remote = window.require("electron").remote;

    class PrescriptionStore {
        constructor() {
            const ajv = new Ajv({
                allErrors: true,
                useDefaults: true
            });
    
            this.schemaValidator = ajv.compile(prescriptionSchema);
            const dbPath = path.join(remote.app.getPath("userData"), "/prescriptions.db");
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
            } else {
                return isValid.errors;
            }
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
    
        async getPrescription(_id) {
            return await this.db.findOne({_id}).exec()
        }
  
    }


export default new PrescriptionStore();
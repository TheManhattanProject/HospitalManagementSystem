import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const vitalSchema= require('../schemas/vitals');
const remote = window.require("electron").remote;

class VitalStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(vitalSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/vitals.db");
        this.db = Datastore.create({
            autoload: true,
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data) {
        return this.schemaValidator(data);
    }

    async create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return await this.db.insert(data);
        } else {
            return isValid.errors;
        }
    }

    read(_id) {
        return  this.db.findOne({_id}).exec()
    }

    test() {
         

        return  this.db.find()
    }

    async getVitals(id){
        return await this.db.find({prescription: id});
    }

    readAll() {
        return  this.db.find()
    } 
}

export default new VitalStore();

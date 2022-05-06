import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const departmentschema= require('../schemas/Department');
const remote = window.require("electron").remote;

class DepartmetStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(departmentschema);
        const dbPath = path.join(remote.app.getPath("userData"), "/deparments.db");
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
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        // 
        return this.db.find();
    } 
}

export default new DepartmetStore();

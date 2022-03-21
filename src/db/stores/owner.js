import path from "path";
const Datastore = require('nedb');
const Ajv = require('ajv');
const ownerSchema= require('../schemas/owner');
const remote = window.require("electron").remote;

class ownerStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(ownerSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/owner.db");
        this.db = new Datastore({
            autoload: true,
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data) {
        return this.schemaValidator(data);
    }

    create(data) {
        const isValid = this.validate(data);
        if (isValid) {
            return this.db.insert(data);
        }
        return "Invalid data";
    }

    read(_id) {
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        return this.db.find()
    }
    
}

export default new ownerStore();

import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const adminSchema= require('../schemas/admin');
const remote = window.require("electron").remote;

class adminStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(adminSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/admin.db");
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
            let doc = await this.db.findOne({email: data.email}).exec();
            if (doc) {
                return "Email already exists";
            }  
            return await this.db.insert(data);
        } else {
            return isValid.errors;
        }
    }

    read(_id) {
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        return this.db.find()
    }
    
    async login(email, password) {
        let doc = await this.db.findOne({email: email}).exec();
        if (doc) {
            if (doc.password === password) {
                return doc;
            }
            else {
                return "Invalid password";
            }
        }
        else {
            return "Invalid email";
        }
    }    
}

export default new adminStore();

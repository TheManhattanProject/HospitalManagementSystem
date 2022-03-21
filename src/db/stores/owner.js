import path from "path";
const Datastore = require('nedb-promises');
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
        this.db = Datastore.create({
            autoload: true,
            filename: dbPath,
            timestampData: true,
        });
    }

    validate(data) {
        return this.schemaValidator(data);
    }

    create(data) {
        data.id = this.getNextId();
        const isValid = this.validate(data);
        let newOwner;
        if (isValid) {
            console.log("inside");
            this.db.insert(data, (err, newDoc) => {
                if (err) {
                    console.log(err);
                    newOwner = err;
                }
                else{
                    console.log(newDoc);
                    newOwner = newDoc;
                }
            })
            return newOwner;
        }
        return "Invalid data";
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

export default new ownerStore();

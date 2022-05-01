import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const speciesSchema= require('../schemas/species');
const remote = window.require("electron").remote;

class SpeciesStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(speciesSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/species.db");
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
         this.db.insert({
            name:"test154t"
        });
         this.db.insert({
            name:"test24522465y"
        });
         this.db.insert({
            name:"test3425465"
        });
         this.db.insert({
            name:"test4wrtyrghnety"
        });
         this.db.insert({
            name:"test5rwthdfghnethyn"
        });
        this.db.insert({
            name:"test6etrwyetdhmntyhede"
        });

        return  this.db.find()
    }

    readAll() {
        return  this.db.find()
    } 
}

export default new SpeciesStore();

const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const ownerSchema= require('../schemas/owner');

class ownerStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(ownerSchema);
        const dbPath = `${process.cwd()}/owner.db`;
        this.db = Datastore.create({
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
    }

    read(_id) {
        return this.db.findOne({_id}).exec()
    }

    readAll() {
        return this.db.find()
    }
    
}

module.exports = new ownerStore();

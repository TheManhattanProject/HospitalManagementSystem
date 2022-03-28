import path from "path";
import Login from "../../components/Login";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const veternarianSchema= require('../schemas/veternarian');
const remote = window.require("electron").remote;

class VeternarianStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(veternarianSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/veternarian.db");
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
            let doc = await this.db.findOne({email: data.email});
            if(doc){
                return "Email already exists";
            }
            return await this.db.insert(data);
        }
        return isValid.errors;
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
            return await this.db.update({_id: id}, data);
        }
    }

    async delete(id){
        return await this.db.remove({id: id});
    }
    async getVeterinarian(id){
        const vet = await this.read(id);
        if(!vet){
            return null;
        }
        return vet;
    }

    async login(email, password){
        const vet = await this.db.findOne({email: email});
        if(!vet){
            return "Invalid Email";
        }
        if(vet.password === password){
            return vet;
        }
        return "Invalid Password";

    }
}

export default new VeternarianStore();

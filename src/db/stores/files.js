import path from "path";
const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const filesSchema= require('../schemas/files');
const {remote, ipcRenderer} = window.require("electron");

const appDir = path.join(remote.app.getAppPath("userData"), "photos");

class FilesStore {
    constructor() {
        const ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = ajv.compile(filesSchema);
        const dbPath = path.join(remote.app.getPath("userData"), "/files.db");
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
            const filePath = path.join( appDir, data.prescription, data.title);
            // fs.copyFileSync( data.path, filePath );
            ipcRenderer.send("copy-file", data.path, filePath);
            data.path = filePath;
            return await this.db.insert(data);
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

    async getPhotos(id) {
        return await this.db.find({prescription: id});
    }

}

export default new FilesStore();

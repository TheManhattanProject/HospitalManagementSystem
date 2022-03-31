const treatmentschema = {
    type: "object",
    properties : {
        name: {
            type: "string",
        },
        frequency: {
            type: "string",
        },
        remarks : {
            type: "string",
        },
        days :{
            type: "string",
        }, 
        inhouse : {
            type: "string",
        },
        prescription : {
            type: "string",
        },
    }
}
module.exports = treatmentschema;
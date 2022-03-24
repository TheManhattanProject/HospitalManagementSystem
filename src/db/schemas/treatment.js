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
        prescription : {
            type: "string",
        },
    }
}
module.exports = treatmentschema;
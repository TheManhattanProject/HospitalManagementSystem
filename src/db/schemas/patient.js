const patientschema = {
    type: "object",
    properties: {
        id: {
            type: "number",
        },
        name: {
            type: "string"
        },
        age: {
            type: "number",
        },
        sex: {
            type: "string",
        },
        species: {
            type: "string",
        },
        breed: {
            type: "string",
        },
        bodyweight: {
            type: "number",
        },
        color: {
            type: "string",
        },
        health: {
            type: "string",
        },
        owner: {
            type: "number",
        }
    
    },
};

module.exports = patientschema;
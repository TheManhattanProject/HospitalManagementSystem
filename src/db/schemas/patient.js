const patientschema = {
    type: "object",
    properties: {
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
        bodyweight: {
            type: "number",
        },
        color: {
            type: "string",
        },
        fertility: {
            type: "string",
        },
        owner: {
            type: "string",
        },
        profile: {
            type: "string",
        }
    },
};

module.exports = patientschema;
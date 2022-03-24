const investigationschema = {
    type: "object",
    properties : {
        name: {
            type: "string",
        },
        filename: {
            type: "string",
        },
        path: {
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
module.exports = investigationschema;
const reportschema = {
    type: "object",
    properties : {
        id: {
            type: "number",
        },
        patient: {
            type: "number",
        },
        owner: {
            type: "number",
        },
        remarks : {
            type: "string",
        },
        prescription : {
            type: "string",
        },
        transaction : {
            type: "number",
        },
        datetime : {
            type: "string",
        }
    }
}
module.exports = reportschema;
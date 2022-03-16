const filesSchema = {
    type: "object",
    properties: {
        id: {
            type: "number",
        },
        path: {
            type: "string",
        },
        patient: {
            type: "string",
        },
        title: {
            type: "string",
        }
    }
}

module.exports = filesSchema;
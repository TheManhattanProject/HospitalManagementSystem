const filesSchema = {
    type: "object",
    properties: {
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
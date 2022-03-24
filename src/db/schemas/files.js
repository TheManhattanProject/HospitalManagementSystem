const filesSchema = {
    type: "object",
    properties: {
        path: {
            type: "string",
        },
        title: {
            type: "string",
        },
        appointment: {
            type: "string",
        },
        category: {
            type: "string",
        },
        remarks: {
            type: "string",
        },
    }
}

module.exports = filesSchema;
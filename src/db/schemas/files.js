const filesSchema = {
    type: "object",
    properties: {
        path: {
            type: "string",
        },
        title: {
            type: "string",
        },
        prescription: {
            type: "string",
        },
    }
}

module.exports = filesSchema;
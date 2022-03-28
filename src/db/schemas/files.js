const filesSchema = {
    type: "object",
    properties: {
        path: {
            type: "string",
        },
        title: {
            type: "string",
        },
        filename:{
            type: "string",
        },
        prescription: {
            type: "string",
        },
    }
}

module.exports = filesSchema;